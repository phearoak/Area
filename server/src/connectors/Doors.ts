import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Field } from "@prisma/client";
import { Environment as env } from "@providers";

export class Doors extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(): Promise<any> {
        return {
            token: "True",
        };
    }

    async webhook(workflow_id: number, event: string): Promise<void> { }


    async field_open_door(payload?: Field[]) {
        if (payload == null) return;
        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select") {
                        field.options = [
                            "HUB",
                            "4eme",
                            "Foyer",
                            "Meetup",
                            "SM1",
                            "SM2",
                            "Stream",
                            "Admissions"
                        ];
                    }
                    return field;
                }
            )
        );
    }

    async open_door(
        payload?: Object & {
            name: string
        }
    ) {
        if (!payload || !payload.name) return;

        const api_token = env.doors.apiKey;
        const url = `https://epilogue.arykow.com/api/doors_open?token=${api_token}&door_name=${payload.name}`

        await fetch(url);
        return;
    }
}
