import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Field } from "@prisma/client";
import { Environment as env } from "@providers";

export class Youtube extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<any> {
        const clientId = env.google.clientId;
        const clientSecret = env.google.clientSecret;
        const redirectUri = `${env.app.host}/connector/youtube/authorize`;

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

        // const callbackUrl = "https://70a4-2a01-e0a-165-5d00-3600-4f35-f510-261.eu.ngrok.io/connector/youtube/test";

        // const webhookUrl = "https://www.googleapis.com/youtube/v3/webhooks";

        // const webhook = {
        //     "callbackUrl": "https://70a4-2a01-e0a-165-5d00-3600-4f35-f510-261.eu.ngrok.io/connector/youtube/test",
        //     "expiration": "2024-01-01T00:00:00.000Z",
        //     "topicId": "/youtube/channel/item_id",
        //     "token": access_token
        // };
        // console.log("1")
        // const response = await fetch(`https://www.googleapis.com/youtube/v3/webhooks?part=snippet`, {
        //     method: "POST",
        //     headers: {
        //         "Authorization": `Bearer ${access_token}`,
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         snippet: webhook
        //     })
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error(`Failed to create webhook: ${response.statusText}`);
        //         }
        //         response.json()
        //     })
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        // const d = await response.text();
        // console.log(d);
        // const response = await fetch(webhookUrl, {
        //     method: "POST",
        //     headers: {
        //         "Authorization": "Bearer " + access_token,
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         "topicDetails": {
        //             "topicId": "video",
        //             "type": "video",
        //             "kind": "youtube#video",
        //             "videoId": "",
        //         },
        //         "callbackUrl": callbackUrl,
        //     })
        // });
        // const resp = await response.json();
        // console.log(resp);
        return {
            access_token: access_token,
            expires_in: expires_in,
        };
    }

    async webhook(workflow_id: number, event: string): Promise<void> {
        const access_token = this.token;
        const callbackUrl = `${env.app.host}/connector/youtube/`;

        const webhookUrl = "https://www.googleapis.com/youtube/v3/webhooks";

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + access_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topicDetails: {
                    topicId: "video",
                    type: "video",
                    kind: "youtube#video",
                    videoId: "",
                },
                callbackUrl: callbackUrl,
            }),
        });
        const data = await response.json();
        console.log(data);
    }
}
