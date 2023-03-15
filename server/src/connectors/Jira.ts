import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Environment as env } from "@providers";
import { TokenService } from "@services";
import axios from "axios";

export class Jira extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<any> {
        const response = await axios.post(
            `https://auth.atlassian.com/oauth/token`,
            {
                grant_type: "authorization_code",
                client_id: env.github.clientId,
                client_secret: env.github.clientSecret,
                code: code,
                redirect_uri: `${env.app.host}/connector/jira/authorize`,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const res = await axios.post(
            `https://auth.atlassian.com/oauth/token`,
            {
                grant_type: "refresh_token",
                client_id: env.github.clientId,
                client_secret: env.github.clientSecret,
                refresh_token: response.data.refresh_token,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const { access_token, expires_in, refresh_token } = res.data;
        if (!access_token)
            throw new UnauthorizedException("Jira access_token failed.");

        return { access_token, expires_in, refresh_token };
    }

    async refreshToken() {
        const token = await TokenService.getByAccessToken(this.token!);
        if (!token) throw new UnauthorizedException("Access_token not found");

        if (!token.expires_in) return;

        const expires_in = Number(token.expires_in);
        const now = new Date();
        const token_updated_at = new Date(token.updated_at);
        const expirationTime = new Date(
            token_updated_at.getTime() + expires_in * 1000
        );

        if (now < expirationTime) return;

        // If token is expired, generate a new one
        const response = await axios.post(
            "https://auth.atlassian.com/oauth/token",
            {
                grant_type: "refresh_token",
                client_id: env.jira.clientId,
                client_secret: env.jira.clientSecret,
                refresh_token: token.refresh_token,
            }
        );
        await TokenService.updateTokenByOneId(
            token.user_id,
            token.service_id,
            response.data.access_token,
            response.data.refresh_token,
            response.data.expires_in
        );
    }

    async webhook(
        workflow_id: number,
        event: string,
        payload?: Object
    ): Promise<void> {
        if (!payload) return;

        // Usage of this method for every functions that call the API
        this.refreshToken();

        await axios.post(
            `https://api.atlassian.com/ex/jira/fdbd3e95-a504-40c4-9679-69abe46c391f/rest/api/3/webhook`,
            {
                events: [`jira:${event}`],
                jqlFilter: "project = area",
            },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }
}
