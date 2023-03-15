import type {
    Express as NativeExpress,
    NextFunction,
    Request,
    Response,
} from "express";
import { errorHandler } from "@middlewares/error.middleware";
import { Environment as env } from "@providers";
import cookieParser from "cookie-parser";
import express from "express";
import routes from "@routes";
import cors from "cors";
import { NotFoundException } from "@exceptions";

class Express {
    private app: NativeExpress;

    constructor() {
        this.app = express();
        this.middleware();
    }

    middleware = () => {
        this.app.use(
            cors({
                origin: ["http://localhost:8081"],
                credentials: true,
            })
        );
        this.app.use(cookieParser());

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(env.app.routePrefix, routes);
        this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
            return next(new NotFoundException("This route does not exist."));
        });
        this.app.use(errorHandler);
    };

    listen = () => {
        this.app.listen(8080, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on ${env.app.host}`);
        });
    };

    getApp = () => {
        return this.app;
    };
}

export default Express;
