import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Field } from "@prisma/client";
import { Environment as env } from "@providers";
import axios from "axios";

export class Spotify extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<string> {
        const client_id = env.spotify.clientId;
        const client_secret = env.spotify.clientSecret;

        const requestBody = {
            grant_type: "authorization_code",
            code: code.toString(),
            redirect_uri: `${env.app.host}/connector/spotify/authorize`,
        };
        const headers = {
            Authorization: `Basic ${Buffer.from(
                `${client_id}:${client_secret}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        };

        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: new URLSearchParams(requestBody),
            headers: headers,
        });
        const data = await res.json();
        const token = data["access_token"];
        if (token == null)
            throw new UnauthorizedException("Connection spotify failed.");

        return token;
    }

    async webhook(workflow_id: number, event: string): Promise<void> {}

    async create_playlist(
        payload?: Object & {
            playlist: string;
        }
    ) {
        if (!payload || !payload.playlist) return;
        const user_id = await axios.get(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        await axios.post(
            `https://api.spotify.com/v1/users/${user_id.data.id}/playlists`,
            { name: payload.playlist },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }
    async add_item_to_playlist(
        payload?: Object & {
            playlist: string;
            uri: string;
        }
    ) {
        if (!payload || !payload.playlist || payload.uri) return;
        await axios.post(
            `https://api.spotify.com/v1/playlists/${payload.playlist}/tracks`,
            { uris: [payload.uri] },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }
    async field_add_item_to_playlist(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "playlist") {
                        const user_id = await axios.get(
                            `https://api.spotify.com/v1/me`,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            }
                        );
                        const response = await axios.get(
                            `https://api.spotify.com/v1/users/${user_id.data.id}/playlists`,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            }
                        );
                        field.options = response.data.items.map(
                            (item: Object & { id: string }) => item.id
                        );
                    }
                    return field;
                }
            )
        );
    }
    async follow_playlist(
        payload?: Object & {
            playlist: string;
        }
    ) {
        if (!payload || !payload.playlist) return;
        await axios.put(
            `https://api.spotify.com/v1/playlists/${payload.playlist}/followers`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }

    async update_playlist(
        payload?: Object & {
            playlist: string;
            name: string;
            description: string;
        }
    ) {
        if (
            !payload ||
            !payload.playlist ||
            !payload.name ||
            !payload.description
        )
            return;
        await axios.put(
            `https://api.spotify.com/v1/playlists/${payload.playlist}`,
            { name: payload.name, description: payload.description },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }

    async field_update_playlist(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "playlist") {
                        const user_id = await axios.get(
                            `https://api.spotify.com/v1/me`,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            }
                        );
                        const response = await axios.get(
                            `https://api.spotify.com/v1/users/${user_id.data.id}/playlists`,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            }
                        );
                        field.options = response.data.items.map(
                            (item: Object & { id: string }) => item.id
                        );
                    }
                    return field;
                }
            )
        );
    }

    async save_user_track(
        payload?: Object & {
            track: string;
        }
    ) {
        if (!payload || !payload.track) return;
        await axios.post(
            `https://api.spotify.com/v1/me/tracks`,
            {
                ids: [payload.track],
            },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }
}
