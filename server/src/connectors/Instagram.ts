import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Environment as env } from "@providers";
import { Field } from "@prisma/client";

export class Instagram extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<any> {
        const client_id = env.instagram.clientId;
        const client_secret = env.instagram.clientSecret;
        const url = "https://api.instagram.com/oauth/access_token";
        const redirect_uri = `${env.app.host}/connector/instagram/authorize`;

        const formData = new FormData();
        formData.append("client_id", client_id);
        formData.append("client_secret", client_secret);
        formData.append("grant_type", "authorization_code");
        formData.append("redirect_uri", redirect_uri);
        formData.append("code", code);

        const response = await fetch(`${url}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        const access_token = data.access_token;
        const expires_in = data.expires_in;
        console.log(data);

        if (access_token == null)
            throw new UnauthorizedException("Connection instagram failed.");

        this.token = access_token;

        return {
            access_token: access_token,
        };
    }

    async webhook(): Promise<any> {
        console.log("test webhook");
        return;
    }

    async like_last_publication(
        payload?: Object & {
            username: string;
        }
    ) {
        // 13388993151
        if (!payload || !payload.username) return;

        fetch(
            `https://graph.instagram.com/v13.0/subscriptions?access_token=${""}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    object: "user",
                    callback_url:
                        "https://56e0-2a01-e0a-165-5d00-406b-c310-1c55-adb6.eu.ngrok.io/instagram/callback",
                    // verify_token: 'your-verify-token' // Optional. Used to verify that the callback came from Instagram.
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
        return;
    }

    // async webhook(workflow_id: number, event: string): Promise<void> {
    // }
}
