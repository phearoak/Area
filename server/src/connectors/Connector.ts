import { IConnector } from "@interfaces";

export class Connector {
    protected token?: string;

    constructor(token?: string) {
        this.token = token;
    }

    async field(event: string, payload?: Object) {
        try {
            return await (this as any)[`field_${event}`](payload);
        } catch (err) {
            return payload;
        }
    }

    async event(event: string, payload?: Object) {
        await (this as any)[event](payload);
    }
}
