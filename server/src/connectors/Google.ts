import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Field } from "@prisma/client";
import { Environment as env } from "@providers";

export class Google extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<any> {
        const clientId = env.google.clientId;
        const clientSecret = env.google.clientSecret;
        const redirectUri = `${env.app.host}/auth/signin/google`;

        const res = await fetch(`https://oauth2.googleapis.com/token`, {
            method: "POST",
            body: `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const data = await res.json();
        const access_token = data["access_token"];
        const expires_in = data["expires_in"];
        if (access_token == null)
            throw new UnauthorizedException("Connection youtube failed.");
        this.token = access_token;
        return {
            access_token: access_token,
            expires_in: expires_in,
        };
    }

    async getGoogleEmail(): Promise<string> {
        const url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json";
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        const data = await response.json();
        return data.email;
    }

    async webhook(workflow_id: number, event: string): Promise<void> {}
}
