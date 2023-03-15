import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Field } from "@prisma/client";
import { Environment as env } from "@providers";

export class Gmail extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<any> {
        const clientId = env.google.clientId;
        const clientSecret = env.google.clientSecret;
        const redirectUri = `${env.app.host}/connector/gmail/authorize`;

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
        // console.log(data);

        if (access_token == null)
            throw new UnauthorizedException("Connection gmail failed.");
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

    async send_email_notification(
        payload?: Object & {
            subject: string;
            body: string;
        }
    ) {
        if (!payload || !payload.body) return;

        const me = this.getGoogleEmail();

        const str = [
            `To: ${me}`,
            `Subject: ${payload.subject}`,
            "",
            payload.body,
        ].join("\n");

        const content = Buffer.from(str)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");

        const response = await fetch(
            "https://www.googleapis.com/gmail/v1/users/me/messages/send",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    raw: content,
                }),
            }
        );

        const message = await response.text();
    }

    async send_email(
        payload?: Object & {
            to_address: string;
            subject: string;
            body: string;
        }
    ) {
        if (!payload || !payload.to_address || !payload.body) return;

        const me = this.getGoogleEmail();

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.token}`);
        headers.append("Content-Type", "application/json");

        const message = `From: <${me}>\nTo: <${payload.to_address}>,\nSubject: "${payload.subject}"\n\n"${payload.body}"`;

        const encodedMessage = btoa(message);

        const response = await fetch(
            "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
            {
                method: "POST",
                headers,
                body: JSON.stringify({
                    raw: encodedMessage,
                }),
            }
        );

        if (response.ok) {
            console.log("Email sent successfully");
        } else {
            console.log("Error sending email", await response.text());
        }
    }
}
