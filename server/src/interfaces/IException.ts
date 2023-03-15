import { Environment as env } from "@providers";
import httpStatus from "http-status";

export class IException {
    message: string | undefined;
    stack: string | undefined;
    status: number;

    constructor(status: number, message?: string, stack?: string) {
        this.message = message;
        this.status = status;
        this.stack = stack;
    }

    json = (): {
        status: number;
        type: string;
        message?: string;
    } => {
        return {
            status: this.status,
            type: <string>httpStatus[`${this.status.toString()}_NAME`],
            ...(this.message != null &&
                this.message.length > 0 && { message: this.message }),
            ...(env.isDevelopment &&
                this.stack != null && { stack: this.stack }),
        };
    };
}
