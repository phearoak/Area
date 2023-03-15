import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Environment as env } from "@providers";
import { Field } from "@prisma/client";

export class Facebook extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<any> {
        const client_id = env.facebook.clientId;
        const client_secret = env.facebook.clientSecret;
        const url = "https://graph.facebook.com/v16.0/oauth/access_token?";
        const redirect_uri = `${env.app.host}/connector/facebook/authorize`;

        const response = await fetch(
            `${url}client_id=${client_id}&redirect_uri=${redirect_uri}&client_secret=${client_secret}&code=${code}`,
            {
                method: "GET",
            }
        );

        const data = await response.json();
        const access_token = data.access_token;
        const expires_in = data.expires_in;

        if (access_token == null)
            throw new UnauthorizedException("Connection facebook failed.");

        this.token = access_token;

        return {
            access_token: access_token,
            expires_in: expires_in,
        };
    }

    async getFacebookEmail(): Promise<string> {
        const url =
            "https://graph.facebook.com/v16.0/me?fields=email&access_token=";
        const response = await fetch(`${url}${this.token}`, {
            method: "GET",
        });

        const data = await response.json();
        const email = data.email;
        if (email == null) throw new BadRequestException("Email not found.");
        return email;
    }

    async webhook(): Promise<any> {
        const pageAccessToken = this.token;
        const appSecret = env.facebook.clientSecret;
        const callbackUrl =
            "https://9e12-2a01-e0a-165-5d00-b3f5-8b9b-9522-6795.eu.ngrok.io/connector/facebook/callback";

        fetch(
            `https://graph.facebook.com/v16.0/100090221335298/subscriptions?access_token=${pageAccessToken}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    object: "page",
                    callback_url: callbackUrl,
                    fields: "messages",
                    include_values: true,
                    access_token: pageAccessToken,
                    app_secret: appSecret,
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
    }

    async like_last_page_publication(
        payload?: Object & {
            id: string;
        }
    ) {
        if (!payload || !payload.id) return;

        const response = await fetch(
            `https://graph.facebook.com/v16.0/${payload.id}/likes`,
            {
                method: "POST",
                body: JSON.stringify({ access_token: this.token }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
    }

    async comment_last_page_publication(
        payload?: Object & {
            id: string;
            comment: string;
        }
    ) {
        if (!payload || !payload.id) return;

        const response = await fetch(
            `https://graph.facebook.com/v16.0/${payload.id}/comments`,
            {
                method: "POST",
                body: JSON.stringify({ access_token: this.token }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
    }

    async getFacebookPages() {
        const endpoint = `https://graph.facebook.com/me/accounts?access_token=${this.token}`;

        const response = await fetch(endpoint, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });
        const data = await response.json();
        return data.data;
    }

    async getMyPublication(page_id: number, pages_token: string) {
        const response = await fetch(
            `https://graph.facebook.com/v16.0/${page_id}/feed?access_token=${pages_token}`
        );
        const data = await response.json();
        return data.data;
    }

    async post_publication(
        payload?: Object & {
            page: string;
            message: string;
        }
    ) {
        if (!payload || !payload.page || !payload.message) return;

        const accountUrl = `https://graph.facebook.com/v16.0/me/accounts?access_token=`;
        const account = await fetch(`${accountUrl}${this.token}`, {
            method: "GET",
        });
        const info = await account.json();

        var found = Object.keys(info.data).map(function (key) {
            if (info.data[key].name === payload.page) {
                return info.data[key].id;
            }
        });

        const id = found[0];
        const pageAccessToken = info.data[0].access_token;

        const url = `https://graph.facebook.com/v16.0/${id}/feed?message=${payload.message}&access_token=`;
        const response = await fetch(`${url}${pageAccessToken}`, {
            method: "POST",
        });
        const data = await response.json();
        return data;
    }

    async field_post_publication(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "page") {
                        const response = await (
                            await fetch(
                                `https://graph.facebook.com/v16.0/me/accounts?access_token=${this.token}`,
                                {
                                    method: "GET",
                                }
                            )
                        ).json();
                        field.options = response.data.map(
                            (
                                page: Object & {
                                    name: string;
                                }
                            ) => page.name
                        );
                    }
                    return field;
                }
            )
        );
    }

    // async webhook(workflow_id: number, event: string): Promise<void> {
    // }
}
