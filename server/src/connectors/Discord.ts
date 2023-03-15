import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Field } from "@prisma/client";
import { Environment as env } from "@providers";
import { Jwt } from "@providers";

export class Discord extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<any> {
        const params = {
            client_id: env.discord.clientId,
            client_secret: env.discord.clientSecret,
            code: code.toString(),
            grant_type: "authorization_code",
            scope: "webhook.incoming%20guilds%20identify",
            redirect_uri: `${env.app.host}/connector/discord/authorize`,
        };

        // POST Request for access token from discord
        const response = await fetch(
            `https://discord.com/api/v10/oauth2/token`,
            {
                method: "POST",
                body: new URLSearchParams(params),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const data = await response.json();
        const token = data["access_token"];
        const refresh_token = data["refresh_token"];
        const expires_in = data["expires_in"];
        this.token = token;
        console.log(data);
        if (token == null)
            throw new UnauthorizedException("Connection discord failed.");

        return {
            token: token,
            refresh_token: refresh_token,
            expires_in: expires_in,
        };
    }

    async webhook(workflow_id: number, event: string): Promise<void> {
        const channel_id = "EXAMPLE ID:8675309";
        await fetch(
            `https://discord.com/api/v10/channels/${channel_id}/webhooks`,
            {
                method: "POST",
                body: JSON.stringify({
                    name: "Workflow",
                }),
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }

    async field_post_message(payload?: Field[]) {
        if (payload == null) return;
        const servers = await this.getServers();
        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "channel") {
                        const response = await this.getChannelsByID(
                            1065760976768606309
                        );
                        field.options = response;
                    }
                    if (field.type == "select" && field.name == "server") {
                        field.options = servers;
                    }
                    return field;
                }
            )
        );
    }

    async getServers(): Promise<any> {
        const headers = {
            Authorization: `Bearer ${this.token}`,
        };
        const response = await fetch(
            `https://discord.com/api/v10/users/@me/guilds`,
            {
                method: "GET",
                headers: headers,
            }
        );
        const data = await response.json();
        console.log(3);
        console.log(data);
        const names = data.map((obj: any) => obj.name);
        return names;
    }

    async getChannelsByID(id: number): Promise<any> {
        const headers = {
            Authorization: `Bearer ${this.token}`,
        };
        const response = await fetch(
            `https://discord.com/api/v10/users/@me/channels`,
            {
                method: "GET",
                headers: headers,
            }
        );
        const data = await response.json();
        console.log(4);
        console.log(data);
        return response;
    }

    async refreshToken(refresh_token: string): Promise<any> {
        const params = {
            client_id: env.discord.clientId,
            client_secret: env.discord.clientSecret,
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        };

        // POST Request for refresh token from discord
        const response = await fetch(
            `https://discord.com/api/v10/oauth2/token`,
            {
                method: "POST",
                body: new URLSearchParams(params),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        const data = await response.text();
        return data;
    }

    async post_message(
        payload?: Object & {
            content: string;
            webhook_id: number;
            webhook_token: string;
        }
    ) {
        if (
            !payload ||
            !payload.content ||
            !payload.webhook_id ||
            !payload.webhook_token
        )
            return;
        await fetch(
            `https://discord.com/api/v10/webhooks/${payload.webhook_id}/${payload.webhook_token}`,
            {
                method: "POST",
                body: JSON.stringify({
                    content: payload.content,
                }),
            }
        );
    }
}
