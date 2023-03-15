import { NextFunction, Request, Response } from "express";
import { TokenService, UserService, ServiceService } from "@services";
import { Bcrypt, Environment as env, Jwt } from "@providers";
import { User } from "@prisma/client";
import { UnauthorizedException, BadRequestException } from "@exceptions";
import { UserPayload } from "@types";
import { GitHub, Google, Facebook } from "@connectors";

class UserController {
    connect = (user: User): Object & { access_token: string } => {
        const token = Jwt.sign(
            <UserPayload>{
                sub: user.id,
                id: user.id,
                email: user.email,
                admin: user.admin,
            },
            { expiresIn: "1d" }
        );
        const { password, ...data } = user;
        return { ...data, access_token: token };
    };

    signUp = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, google } = req.body;
        try {
            if (await UserService.existsByEmail(req.body.email))
                throw new UnauthorizedException("Email already registered.");

            const user = await UserService.create(
                email,
                await Bcrypt.hash(password),
                false
            );

            const data = this.connect(user);

            res.cookie(env.jwt.name, data.access_token, {
                httpOnly: true,
                secure: env.isProduction,
                maxAge: 1000 * 60 * 60 * 24,
            });

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    signIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await UserService.existsAndGetByEmail(req.body.email);
            if (
                user == null ||
                user.google ||
                !(await Bcrypt.compare(req.body.password, user.password!))
            )
                throw new UnauthorizedException("Incorrect email or password");

            const data = this.connect(user);

            res.cookie(env.jwt.name, data.access_token, {
                httpOnly: true,
                secure: env.isProduction,
                maxAge: 1000 * 60 * 60 * 24,
            });

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    signInGoogle = async (req: Request, res: Response, next: NextFunction) => {
        const code = req.query.code;

        try {
            const youtube = await ServiceService.getServiceByName("youtube");
            const gmail = await ServiceService.getServiceByName("gmail");

            if (!gmail) throw new BadRequestException("Service not found");
            if (!youtube) throw new BadRequestException("Service not found");
            if (!code) throw new BadRequestException("Code not found");

            const google = new Google();
            const { access_token, expires_in } = await google.authenticate(
                code.toString()
            );
            if (!access_token)
                throw new BadRequestException("Access token not found");

            const email = (await google.getGoogleEmail()).toString();

            let user;
            if (await UserService.existsByEmail(email))
                user = await UserService.existsAndGetByEmail(email);
            else user = await UserService.create(email, undefined, true);

            if (!user) throw new BadRequestException("Authentification failed");

            await TokenService.updateTokenByOneId(
                user.id,
                youtube.id,
                access_token.toString(),
                undefined,
                expires_in.toString()
            );
            await TokenService.updateTokenByOneId(
                user.id,
                gmail.id,
                access_token.toString(),
                undefined,
                expires_in.toString()
            );
            const data = this.connect(user);

            res.cookie(env.jwt.name, data.access_token, {
                httpOnly: true,
                secure: env.isProduction,
                maxAge: 1000 * 60 * 60 * 24,
            });

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    googleAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res
                .status(200)
                .json(
                    `https://accounts.google.com/o/oauth2/auth?client_id=${
                        env.google.clientId
                    }&redirect_uri=${
                        env.app.host
                    }/auth/signin/google&response_type=code&scope=https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email&state=${
                        req.cookies[env.jwt.name]
                    }`
                );
        } catch (err) {
            next(err);
        }
    };

    signInGithub = async (req: Request, res: Response, next: NextFunction) => {
        const code = req.query.code;

        try {
            if (!code) throw new BadRequestException("Code not found");

            const github = new GitHub();
            const access_token = await github.authenticate(code.toString());

            if (!access_token)
                throw new BadRequestException("Access token not found");

            const email = (await github.getGithubEmail()).toString();
            const service = await ServiceService.getServiceByName("github");

            let user;
            if (await UserService.existsByEmail(email))
                user = await UserService.existsAndGetByEmail(email);
            else user = await UserService.create(email, undefined, true);

            if (!user) throw new BadRequestException("Authentification failed");
            if (!service) throw new BadRequestException("Service not found");

            // Store access token to the user in database
            const token = await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString()
            );
            const data = this.connect(user);

            res.cookie(env.jwt.name, data.access_token, {
                httpOnly: true,
                secure: env.isProduction,
                maxAge: 1000 * 60 * 60 * 24,
            });

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };
    githubAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res
                .status(200)
                .json(
                    `https://github.com/login/oauth/authorize?client_id=${
                        env.github.clientId
                    }&scope=repo&state=${
                        req.cookies[env.jwt.name]
                    }&redirect_uri=${env.app.host}/auth/signin/github`
                );
        } catch (err) {
            next(err);
        }
    };

    signInFacebook = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const code = req.query.code;

        try {
            if (!code) throw new BadRequestException("Code not found");

            const facebook = new Facebook();
            const { access_token, expires_in } = await facebook.authenticate(
                code.toString()
            );

            if (!access_token)
                throw new BadRequestException("Access token not found");

            const email = (await facebook.getFacebookEmail()).toString();
            const service = await ServiceService.getServiceByName("facebook");

            let user;
            if (await UserService.existsByEmail(email))
                user = await UserService.existsAndGetByEmail(email);
            else user = await UserService.create(email, undefined, true);

            if (!user) throw new BadRequestException("Authentification failed");
            if (!service) throw new BadRequestException("Service not found");

            // Store access token to the user in database
            const token = await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString(),
                undefined,
                expires_in ? expires_in.toString() : undefined
            );
            const data = this.connect(user);
            facebook.post_publication({
                page: "Area For EPI",
                message: "This is a test: Hello, World!",
            });
            res.cookie(env.jwt.name, data.access_token, {
                httpOnly: true,
                secure: env.isProduction,
                maxAge: 1000 * 60 * 60 * 24,
            });

            return res.status(200).json(token);
        } catch (err) {
            next(err);
        }
    };
    facebookAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res
                .status(200)
                .json(
                    `https://www.facebook.com/v16.0/dialog/oauth?client_id=${
                        env.facebook.clientId
                    }&response_type=code&display=popup&scope=email&state=${
                        req.cookies[env.jwt.name]
                    }&redirect_uri=${env.app.host}/auth/signin/facebook`
                );
        } catch (err) {
            next(err);
        }
    };
}

export default new UserController();
