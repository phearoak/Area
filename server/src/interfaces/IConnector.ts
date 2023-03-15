import { Field } from "@prisma/client";

export interface IConnector {
    authenticate(code: string): Promise<string>;
    webhook(workflow_id: number, event: string, payload?: Object): void;
    event(event: string, payload?: Object): void;
    field(event: string, payload?: Object): Promise<Field[]>;
}
