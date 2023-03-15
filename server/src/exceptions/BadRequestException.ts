import { IException } from "@interfaces";

export class BadRequestException extends IException {
    constructor(message?: string) {
        super(400, message);
    }
}
