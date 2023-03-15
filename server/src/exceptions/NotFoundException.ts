import { IException } from "@interfaces";

export class NotFoundException extends IException {
    constructor(message?: string) {
        super(404, message);
    }
}
