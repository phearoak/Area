import { Jwt, Utils } from "@providers";
import { NextFunction, Request, Response } from "express";
import { ServiceService } from "@services";
import { TokenService } from "@services";
import { UserService } from "@services";
import { Environment as env } from "@providers";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import {
    GitHub,
    Discord,
    Twitter,
    Slack,
    Notion,
    Gmail,
    Youtube,
    Instagram,
    Facebook,
    Doors,
    Spotify,
    Jira,
    DropBox,
} from "@connectors";
import crypto from "crypto";

class ConnectorController {
    github = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get ID of the user in params and code in query
            const code = req.query.code;
            const state = req.query.state;

            // Get service ID of github and check if exists in database
            const service = await ServiceService.getServiceByName("github");

            // Check if params exist else return error
            if (!state) throw new BadRequestException("State not found");
            if (!code) throw new BadRequestException("Code not found");
            if (!service) throw new BadRequestException("Service not found");

            // Get ID of the user in jwt state
            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));

            // Check if user exists else return error
            if (!user) throw new UnauthorizedException("User not found");

            // POST Request for access token from github
            const github = new GitHub();
            const access_token = await github.authenticate(code.toString());

            if (!access_token)
                throw new BadRequestException("Access token not found");

            // Store access token to the user in database
            await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString()
            );

            return res.status(200).send(Utils.closeWindow());
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
                    }&redirect_uri=${env.app.host}/connector/github/authorize`
                );
        } catch (err) {
            next(err);
        }
    };

    gmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get ID of the user in params and code in query
            const code = req.query.code;
            const state = req.query.state;

            // Get service ID of gmail and check if exists in database
            const service = await ServiceService.getServiceByName("gmail");

            // Check if params exist else return error
            if (!state) throw new BadRequestException("State not found");
            if (!code) throw new BadRequestException("Code not found");
            if (!service) throw new BadRequestException("Service not found");

            // Get ID of the user in jwt state
            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));

            // Check if user exists else return error
            if (!user) throw new UnauthorizedException("User not found");

            // POST Request for access token from gmail
            const gmail = new Gmail();
            const { access_token, expires_in } = await gmail.authenticate(
                code.toString()
            );

            if (!access_token)
                throw new BadRequestException("Access token not found");

            // Store access token to the user in database
            await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString(),
                undefined,
                expires_in.toString()
            );

            return res.status(200).send(Utils.closeWindow());
        } catch (err) {
            next(err);
        }
    };
    gmailAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res
                .status(200)
                .json(
                    `https://accounts.google.com/o/oauth2/auth?client_id=${
                        env.google.clientId
                    }&redirect_uri=${
                        env.app.host
                    }/connector/gmail/authorize&response_type=code&scope=https://www.googleapis.com/auth/gmail.send&state=${
                        req.cookies[env.jwt.name]
                    }`
                );
        } catch (err) {
            next(err);
        }
    };

    test_youtube = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("test youtube");
            return res.status(200).json({ message: "test" });
        } catch (err) {
            next(err);
        }
    };

    youtube = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get ID of the user in params and code in query
            const code = req.query.code;
            const state = req.query.state;

            // Get service ID of gmail and check if exists in database
            const service = await ServiceService.getServiceByName("youtube");

            // Check if params exist else return error
            if (!state) throw new BadRequestException("State not found");
            if (!code) throw new BadRequestException("Code not found");
            if (!service) throw new BadRequestException("Service not found");

            // Get ID of the user in jwt state
            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));

            // Check if user exists else return error
            if (!user) throw new UnauthorizedException("User not found");

            // POST Request for access token from youtube
            const youtube = new Youtube();
            const { access_token, expires_in } = await youtube.authenticate(
                code.toString()
            );

            if (!access_token)
                throw new BadRequestException("Access token not found");

            // Store access token to the user in database
            await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString(),
                undefined,
                expires_in.toString()
            );

            return res.status(200).send(Utils.closeWindow());
        } catch (err) {
            next(err);
        }
    };
    youtubeAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res
                .status(200)
                .json(
                    `https://accounts.google.com/o/oauth2/auth?client_id=${
                        env.google.clientId
                    }&redirect_uri=${
                        env.app.host
                    }/connector/youtube/authorize&response_type=code&scope=https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email&state=${
                        req.cookies[env.jwt.name]
                    }`
                );
        } catch (err) {
            next(err);
        }
    };

    instagramWebook = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            return res.status(200).json({ message: "test" });
        } catch (err) {
            next(err);
        }
    };

    instagram = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get ID of the user in params and code in query
            const code = req.query.code;
            const state = req.query.state;

            // Get service ID of gmail and check if exists in database
            const service = await ServiceService.getServiceByName("instagram");

            // Check if params exist else return error
            if (!state) throw new BadRequestException("State not found");
            if (!code) throw new BadRequestException("Code not found");
            if (!service) throw new BadRequestException("Service not found");

            // Get ID of the user in jwt state
            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));

            // Check if user exists else return error
            if (!user) throw new UnauthorizedException("User not found");

            // POST Request for access token from youtube
            const instagram = new Instagram();
            const { access_token } = await instagram.authenticate(
                code.toString()
            );

            if (!access_token)
                throw new BadRequestException("Access token not found");

            // Store access token to the user in database
            const token = await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString(),
                undefined,
                undefined
            );

            return res.status(200).json(token);
        } catch (err) {
            next(err);
        }
    };

    instagramTest = (req: Request, res: Response, next: NextFunction) => {
        try {
            const instagram = new Instagram();
            instagram.like_last_publication({
                username: "pilere3m",
            });
            return res.status(200).json({ message: "test" });
        } catch (err) {
            next(err);
        }
    };

    instagramAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res
                .status(200)
                .json(
                    `https://api.instagram.com/oauth/authorize?client_id=${
                        env.instagram.clientId
                    }&redirect_uri=${
                        env.app.host
                    }/connector/instagram/authorize&response_type=code&scope=user_profile,user_media&state=${
                        req.cookies[env.jwt.name]
                    }`
                );
        } catch (err) {
            next(err);
        }
    };

    facebook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get ID of the user in params and code in query
            const code = req.query.code;
            const state = req.query.state;

            // Get service ID of gmail and check if exists in database
            const service = await ServiceService.getServiceByName("facebook");

            // Check if params exist else return error
            if (!state) throw new BadRequestException("State not found");
            if (!code) throw new BadRequestException("Code not found");
            if (!service) throw new BadRequestException("Service not found");

            // Get ID of the user in jwt state
            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));

            // Check if user exists else return error
            if (!user) throw new UnauthorizedException("User not found");

            // POST Request for access token from youtube
            const facebook = new Facebook();
            const { access_token, expires_in } = await facebook.authenticate(
                code.toString()
            );

            if (!access_token)
                throw new BadRequestException("Access token not found");

            // Store access token to the user in database
            const token = await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString(),
                undefined,
                expires_in
            );

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
                    }&redirect_uri=${
                        env.app.host
                    }/connector/facebook/authorize&state&response_type=code&scope=email,pages_manage_posts,pages_read_engagement,pages_show_list&state=${
                        req.cookies[env.jwt.name]
                    }`
                );
        } catch (err) {
            next(err);
        }
    };

    discord = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get ID of the user in params and code in query
            const code = req.query.code;
            const state = req.query.state;

            // Get service ID of github and check if exists in database
            const service = await ServiceService.getServiceByName("discord");

            // Check if params exist else return error
            if (!state) throw new BadRequestException("State not found");
            if (!code) throw new BadRequestException("Code not found");
            if (!service) throw new BadRequestException("Service not found");

            // Get ID of the user in jwt state
            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));

            // Check if user exists else return error
            if (!user) throw new UnauthorizedException("User not found");

            // POST Request for access token from discord
            const discord = new Discord();
            const data = await discord.authenticate(code.toString());
            // const refresh_token = await discord.refreshToken(data.refresh_token);

            if (!data) throw new BadRequestException("Access token not found");

            await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                data.token.toString(),
                data.refresh_token.toString(),
                data.expires_in.toString()
            );
            return res.status(200).send(Utils.closeWindow());
        } catch (err) {
            next(err);
        }
    };
    discordAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res
                .status(200)
                .json(
                    `https://discord.com/oauth2/authorize?client_id=${
                        env.discord.clientId
                    }&redirect_uri=${
                        env.app.host
                    }/connector/discord/authorize&response_type=code&scope=webhook.incoming%20identify%20guilds%20connections&prompt=consent&state=${
                        req.cookies[env.jwt.name]
                    }`
                );
        } catch (err) {
            next(err);
        }
    };

    twitter_request_access = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const TWITTER_API_KEY = env.twitter.apiKey;
            const TWITTER_API_SECRET_KEY = env.twitter.apiSecretKey;
            // const TWITTER_API_KEY = "5bKxqrjdFSQFHQJNqF0EnsHDR";
            // const TWITTER_API_SECRET_KEY =
            //     "qkUnxtzaPiXKwlnGirrTjkoeg8Nt1oIqbIg4Ef8eQG5CuW3zeE";
            const HTTP_ENCODED_CALLBACK_URL = encodeURIComponent(
                `${env.app.host}/connector/twitter/authorize`
            );

            const nonce = crypto.randomBytes(16).toString("hex");
            const timestamp = Math.floor(Date.now() / 1000);

            const parameters = [
                `oauth_callback=${HTTP_ENCODED_CALLBACK_URL}`,
                `oauth_consumer_key=${TWITTER_API_KEY}`,
                `oauth_nonce=${nonce}`,
                `oauth_signature_method=HMAC-SHA1`,
                `oauth_timestamp=${timestamp}`,
                `oauth_version=1.0`,
            ]
                .sort()
                .join("&");

            const signatureBaseString = `POST&https%3A%2F%2Fapi.twitter.com%2Foauth%2Frequest_token&${encodeURIComponent(
                parameters
            )}`;
            const signingKey = `${TWITTER_API_SECRET_KEY}&`;
            const signature = crypto
                .createHmac("sha1", signingKey)
                .update(signatureBaseString)
                .digest("base64");

            const authorizationHeader = `OAuth oauth_callback="${HTTP_ENCODED_CALLBACK_URL}", oauth_consumer_key="${TWITTER_API_KEY}", oauth_nonce="${nonce}", oauth_signature="${encodeURIComponent(
                signature
            )}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${timestamp}", oauth_version="1.0"`;

            const response = await fetch(
                "https://api.twitter.com/oauth/request_token",
                {
                    method: "POST",
                    headers: {
                        Authorization: authorizationHeader,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            const data = await response.text();
            const token = new URLSearchParams(data).get("oauth_token");
            return res.status(200).send(Utils.closeWindow());
        } catch (err) {
            next(err);
        }
    };

    stripe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(404).json("Stripe service pending...");
        } catch (err) {
            next(err);
        }
    };
    stripeAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json(``);
        } catch (err) {
            next(err);
        }
    };

    tweet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const twitter = new Twitter();
            const response = twitter.post_tweet(
                "1616381016909684742-7XwKELOrBHQd8hJheUZ8VxYHM2SahB"
            );
            return res.status(404).json(response);
        } catch (err) {
            next(err);
        }
    };

    twitter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { oauth_token, oauth_verifier } = req.query;
            // const { id } = req.user;
            const id = 1;
            // console.log(oauth_token, oauth_verifier);

            const service = await ServiceService.getServiceByName("twitter");

            // Check if params exist else return error
            if (!service) throw new BadRequestException("Service not found");
            if (!oauth_token || !oauth_verifier)
                throw new BadRequestException("Query not found");

            // Get ID of the user in jwt state
            const user = await UserService.getUserById(id);

            // Check if user exists else return error
            if (!user) throw new UnauthorizedException("User not found");

            // POST Request for access token from twitter
            const twitter = new Twitter();
            const access_token = await twitter.authenticate(
                oauth_token.toString() + "&" + oauth_verifier.toString()
            );

            if (!access_token)
                throw new BadRequestException("Access token not found");

            const token = await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString()
            );
            console.log(token);
            const tweet = await twitter.post_tweet(access_token.toString());
            return res.status(200).json(tweet);
        } catch (err) {
            next(err);
        }
    };
    twitterAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json(``);
        } catch (err) {
            next(err);
        }
    };

    slack = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // // Get ID of the user in params and code in query
            // const code = req.query.code
            // const state = req.query.state
            // const redirect_uri = "https://0105-2001-861-5d90-c360-58f0-ce65-cf2a-d734.eu.ngrok.io/connector/slack/authorize"
            // const query = `client_id=${process.env.SLACK_CLIENT_ID!}&client_secret=${process.env.SLACK_CLIENT_SECRET!}&code=${code}&redirect_uri=${redirect_uri}`
            // // Get service ID of github and check if exists in database
            // const service = await ServiceService.getServiceByName("slack")
            // Check if params exist else return error
            // if (!state) throw new BadRequestException("State not found");
            // if (!code) throw new BadRequestException("Code not found");
            // if (!redirect_uri) throw new BadRequestException("Redirect uri not found");
            // if (!state) throw new BadRequestException("State not found");
            // if (!service) throw new BadRequestException("Service not found");
            // const jwt: any = Jwt.verify(state.toString());
            // const user = await UserService.getUserById(parseInt(jwt.id))
            // // Check if user exists else return error
            // if (!user) return res.status(400).json({ message: "User not found" });
            // // POST Request for access token from discord
            // const slack = new Slack();
            // const access_token = await slack.authenticate(query);
            // if (!access_token) return res.status(400).json({ message: "Access token not found" });
            // const token = await TokenService.updateTokenByOneId(user.id, service.id, access_token.toString())
            // return res.status(200).json(token);
        } catch (err) {
            next(err);
        }
    };
    slackAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            // return res.status(200).json(`https://slack.com/oauth/authorize?client_id=${env.slack.clientId}&scope=admin&redirect_uri=https://0105-2001-861-5d90-c360-58f0-ce65-cf2a-d734.eu.ngrok.io/connector/slack/authorize/1`);
        } catch (err) {
            next(err);
        }
    };

    notion = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const code = req.query.code;
            const state = req.query.state;

            // Get service ID of github and check if exists in database
            const service = await ServiceService.getServiceByName("discord");

            // Check if params exist else return error
            if (!state) throw new BadRequestException("State not found");
            if (!code) throw new BadRequestException("Code not found");
            if (!service) throw new BadRequestException("Service not found");

            // Get ID of the user in jwt state
            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));

            if (!user) throw new UnauthorizedException("User not found");

            const notion = new Notion();
            const access_token = await notion.authenticate(code.toString());

            if (!access_token)
                throw new BadRequestException("Access token not found");

            // Store access token to the user in database
            await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString()
            );
            return res.status(200).send(Utils.closeWindow());
        } catch (err) {
            next(err);
        }
    };
    notionAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res
                .status(200)
                .json(
                    `https://api.notion.com/v1/oauth/authorize?client_id=${
                        env.notion.clientId
                    }&response_type=code&owner=user&redirect_uri=${
                        env.app.host
                    }/connector/notion/authorize&state=${
                        req.cookies[env.jwt.name]
                    }`
                );
        } catch (err) {
            next(err);
        }
    };

    spotify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const code = req.query.code;
            const state = req.query.state;

            // Get service ID of github and check if exists in database
            const service = await ServiceService.getServiceByName("spotify");

            if (!service)
                return res.status(400).json({ message: "Service not found" });
            if (!code)
                return res.status(400).json({ message: "Code not found" });
            if (!state)
                return res.status(400).json({ message: "State not found" });

            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));

            // Check if user exists else return error
            if (!user)
                return res.status(400).json({ message: "User not found" });

            // POST Request for access token from spotify
            const spotify = new Spotify();
            const access_token = await spotify.authenticate(code.toString());

            // Store access token to the user in database
            const token = await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString()
            );
            return res.status(200).send(Utils.closeWindow());
        } catch (err) {
            next(err);
        }
    };
    spotifyAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            return res
                .status(200)
                .json(
                    `https://accounts.spotify.com/authorize?response_type=code&client_id=${
                        env.spotify.clientId
                    }&scope=user-read-private playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read&redirect_uri=${
                        env.app.host
                    }/connector/spotify/authorize&state=${
                        req.cookies[env.jwt.name]
                    }`
                );
        } catch (err) {
            next(err);
        }
    };

    doors = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doors = new Doors();
            await doors.authenticate();

            return res.status(200).send(Utils.closeWindow());
        } catch (err) {
            next(err);
        }
    };
    doorsAuthorize = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            return res
                .status(200)
                .send(`${env.app.host}/connector/doors/authorize`);
        } catch (err) {
            next(err);
        }
    };
    jira = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code, state } = req.query;

            const service = await ServiceService.getServiceByName("jira");

            if (!service) throw new BadRequestException("Service not found");
            if (!code) throw new BadRequestException("State not found");
            if (!state) throw new BadRequestException("Code not found");

            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));
            if (!user) throw new UnauthorizedException("User not found");

            const jira = new Jira();
            const { access_token, expires_in, refresh_token } =
                await jira.authenticate(code.toString());

            await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString(),
                refresh_token.toString(),
                expires_in.toString()
            );
            return res.status(200).send(Utils.closeWindow());
        } catch (err) {
            next(err);
        }
    };
    jiraAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            const url = `https://auth.atlassian.com/authorize?${new URLSearchParams(
                {
                    grant_type: "authorization_code",
                    client_id: env.jira.clientId,
                    client_secret: env.jira.clientSecret,
                    scope: [
                        "read:me",
                        "manage:jira-webhook",
                        "offline_access",
                        "read:jira-work",
                    ].join(" "),
                    redirect_uri: `${env.app.host}/connector/jira/authorize`,
                    state: req.cookies[env.jwt.name],
                    response_type: "code",
                    prompt: "consent",
                }
            ).toString()}`;
            return res.status(200).json(url);
        } catch (err) {
            next(err);
        }
    };

    dropbox = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code, state } = req.query;

            const service = await ServiceService.getServiceByName("dropbox");

            if (!service) throw new BadRequestException("Service not found");
            if (!code) throw new BadRequestException("State not found");
            if (!state) throw new BadRequestException("Code not found");

            const jwt: any = Jwt.verify(state.toString());
            const user = await UserService.getUserById(parseInt(jwt.id));
            if (!user) throw new UnauthorizedException("User not found");

            const dropbox = new DropBox();
            const { access_token, expires_in, refresh_token } =
                await dropbox.authenticate(code.toString());

            await TokenService.updateTokenByOneId(
                user.id,
                service.id,
                access_token.toString(),
                refresh_token.toString(),
                expires_in.toString()
            );
            return res.status(200).send(Utils.closeWindow());
        } catch (err) {
            next(err);
        }
    };
    dropboxAuthorize = (req: Request, res: Response, next: NextFunction) => {
        try {
            const url = `https://www.dropbox.com/oauth2/authorize?${new URLSearchParams(
                {
                    client_id: env.dropbox.clientId,
                    token_access_type: "offline",
                    redirect_uri: `${env.app.host}/connector/dropbox/authorize`,
                    state: req.cookies[env.jwt.name],
                    response_type: "code",
                }
            ).toString()}`;
            return res.status(200).json(url);
        } catch (err) {
            next(err);
        }
    };
}

export default new ConnectorController();
