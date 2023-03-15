import type { Request, Response, NextFunction } from "express";
import { ForbiddenException, UnauthorizedException } from "@exceptions";
import { Environment as env, Jwt } from "@providers";
import { UserPayload } from "@types";

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = <string>req.cookies[env.jwt.name];
        if (token !== undefined) {
            const payload: UserPayload | null = Jwt.verify(token);
            if (payload == null)
                throw new UnauthorizedException("Not authenticated.");
            req.user = payload;
            return next();
        }
        throw new UnauthorizedException("Not authenticated.");
    } catch (err) {
        next(err);
    }
};

export const isAdmin = async <T>(
    req: Request & {
        user: Object;
    },
    res: Response,
    next: NextFunction
) => {
    try {
        const token = <string>req.cookies[env.jwt.name];
        if (token !== undefined) {
            const payload: UserPayload | null = Jwt.verify(token);
            if (payload == null || !payload.admin)
                throw new ForbiddenException();
            req.user = payload;
            return next();
        }
        throw new ForbiddenException();
    } catch (err) {
        next(err);
    }
};

export default { isAuthenticated, isAdmin };
