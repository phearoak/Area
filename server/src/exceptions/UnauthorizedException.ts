import { IException } from "@interfaces";

export class UnauthorizedException extends IException {
    constructor(message?: string) {
        super(401, message);
    }
}
