import { IException } from "@interfaces";

export class ForbiddenException extends IException {
    constructor(message?: string) {
        super(403, message);
    }
}
