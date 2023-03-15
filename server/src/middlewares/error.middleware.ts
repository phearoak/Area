import { IException } from "@interfaces";
import { Environment as env } from "@providers";
import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof IException) {
        return res.status(err.status).json(err.json());
    } else {
        const exception = new IException(
            500,
            env.isDevelopment ? err.message : undefined,
            err.stack
        );
        return res.status(exception.status).json(exception.json());
    }
};
