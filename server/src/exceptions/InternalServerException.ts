import { IException } from "@interfaces";

export class InternalServerException extends IException {
    constructor(message?: string) {
        super(500, message);
    }
}
