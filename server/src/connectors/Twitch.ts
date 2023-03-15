import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Environment as env } from "@providers";

// url: https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=cpeafjlu1nmzx3jyhut1k2ioi4v6sz&redirect_uri=http://localhost:8080/connector/twitch/authorize&scope=channel:manage:videos+moderation:read+user:edit+user:read:follows+user:read:subscriptions+chat:edit+chat:read
// reply: http://localhost:8080/connector/twitch/authorize?code=4osmq9x40xlzgasy9mfyx275t4nj0g&scope=channel%3Amanage%3Avideos+moderation%3Aread+user%3Aedit+user%3Aread%3Afollows+user%3Aread%3Asubscriptions+chat%3Aedit+chat%3Aread

export class Twitch extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<string> {
        const client_id = env.twitch.clientId;
        const client_secret = env.twitch.clientSecret;

        const requestBody = {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: "authorization_code",
            code: code.toString(),
            redirect_uri: `${env.app.host}/connector/twitch/authorize`,
        };
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };

        const res = await fetch("https://id.twitch.tv/oauth2/token", {
            method: "POST",
            body: new URLSearchParams(requestBody),
            headers: headers,
        });
        const data = await res.json();
        const token = data["access_token"];
        if (token == null)
            throw new UnauthorizedException("Connection twitch failed.");
        return token;
    }

    async webhook(workflow_id: number, event: string): Promise<void> {}
}
