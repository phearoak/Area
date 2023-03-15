import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Environment as env } from "@providers";

export class Slack extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(query: string): Promise<string> {
        // POST Request for access token from Slack
        const response = await fetch(`https://slack.com/api/oauth.access?${query}`, {
            method: "GET",
        });

        const data = await response.json();
        const token = data["access_token"];
        if (token == null)
            throw new UnauthorizedException("Connection slack failed.");

        return token;
    }

    async webhook(workflow_id: number, event: string): Promise<void> {
        // const owner = "evandelagnes";
        // const repo = "figma-react-icons-generator";
        // await fetch(`https://api.github.com/repos/${owner}/${repo}/hooks`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         name: "web",
        //         active: true,
        //         events: [event],
        //         config: {
        //             // url: `http://localhost/workflow/${workflow_id}`,
        //             url: `https://www.google.fr`,
        //             content_type: "json",
        //             insecure_ssl: "0",
        //         },
        //     }),
        //     headers: {
        //         Authorization: `Bearer ${this.token}`,
        //     },
        // });
    }
}
