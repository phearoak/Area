import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Environment as env } from "@providers";
import { TokenService } from "@services";
import axios from "axios";

export class DropBox extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<any> {
        const res = await axios.post(
            "https://api.dropbox.com/oauth2/token",
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: `${env.app.host}/connector/dropbox/authorize`,
                client_id: env.dropbox.clientId,
                client_secret: env.dropbox.clientSecret,
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        const response = await axios.post(
            "https://api.dropbox.com/oauth2/token",
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: res.data.refresh_token,
                client_id: env.dropbox.clientId,
                client_secret: env.dropbox.clientSecret,
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token, expires_in } = response.data;
        const { refresh_token } = res.data;
        if (!access_token)
            throw new UnauthorizedException("Dropbox access_token failed.");

        return { access_token, expires_in, refresh_token };
    }
    async webhook() {}

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
            "https://api.dropbox.com/oauth2/token",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: <string>token.refresh_token,
                    client_id: env.dropbox.clientId,
                    client_secret: env.dropbox.clientSecret,
                }).toString(),
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

    // revoke call should be good but don't know how to get the result : https://dropbox.github.io/dropbox-api-v2-explorer/#auth_token/revoke
    async revoke(token: string): Promise<string> {
        const ret = "";
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        try {
            const res = await fetch(
                "https://api.dropboxapi.com/2/auth/token/revoke",
                {
                    method: "POST",
                    headers: headers,
                }
            );
            if (!res.ok) {
                throw new Error("Post error");
            } else {
                // supprimer le token de la DB
            }
        } catch (err) {
            console.log(err);
        }
        return ret;
    }

    async create_folder(
        payload?: Object & {
            destination: string;
        }
    ) {
        if (!payload || !payload.destination) return;
        const res = await axios.post(
            "https://api.dropboxapi.com/2/files/create_folder_v2",
            {
                path: payload.destination,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }

    async move_file_or_dir(
        payload?: Object & {
            from: string;
            to: string;
        }
    ) {
        if (!payload || !payload.from || !payload.to) return;

        await axios.post(
            "https://api.dropboxapi.com/2/files/move_v2",
            { from_path: payload.from, to_path: payload.to },
            {
                headers: { Authorization: `Bearer ${this.token}` },
            }
        );
    }
}
