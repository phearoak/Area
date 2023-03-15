import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Environment as env } from "@providers";
import axios from "axios";

export class Notion extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<string> {
        // const NOTION_CLIENT_ID = "8cae64db-d80b-4a1c-8290-3f88edbaaa4a";
        // const NOTION_CLIENT_SECRET = "secret_Jxs7KFnn8XohgynTDtZUY6fh8LHnWmTp2MRyAt1DcUl";
        // const authorization = Buffer.from(`${NOTION_CLIENT_ID}:${NOTION_CLIENT_SECRET}`).toString('base64');
        const authorization = Buffer.from(
            `${env.notion.clientId}:${env.notion.clientSecret}`
        ).toString("base64");

        const response = await fetch("https://api.notion.com/v1/oauth/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: `${env.app.host}/connector/notion/authorize`,
            }),
        });

        const data = await response.json();
        const token = data["access_token"];

        if (token == null)
            throw new UnauthorizedException("Connection notion failed.");

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

    async create_page(
        payload?: Object & {
            parent: string;
            title: string;
        }
    ) {
        if (!payload || !payload.parent || !payload.title) return;
        const res = await axios.post(
            `https://api.notion.com/v1/pages`,
            {
                parent: {
                    type: "page_id",
                    page_id: payload.parent,
                },
                properties: {
                    title: payload.title,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Notion-Version": "2022-06-28",
                },
            }
        );
    }
    async update_page(
        payload?: Object & {
            page_id: string;
            icon: string;
            cover: string;
        }
    ) {
        if (!payload || !payload.icon || !payload.page_id || !payload.cover)
            return;
        const res = await axios.patch(
            `https://api.notion.com/v1/pages/${payload.page_id}`,
            {
                icon: {
                    type: "external",
                    external: { url: payload.icon },
                },
                cover: {
                    type: "external",
                    external: { url: payload.cover },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Notion-Version": "2022-06-28",
                },
            }
        );
    }
    async create_comment(
        payload?: Object & {
            parent: string;
            body: any;
        }
    ) {
        if (!payload || !payload.parent || !payload.body) return;
        const res = await axios.patch(
            `https://api.notion.com/v1/comments`,
            {
                parent: {
                    page_id: payload.parent,
                },
                rich_text: [
                    {
                        text: {
                            content: payload.body,
                        },
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Notion-Version": "2022-06-28",
                },
            }
        );
    }
}
