import { Connector } from "@connectors";
import { UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Field } from "@prisma/client";
import { Environment as env } from "@providers";
import axios from "axios";

export class GitHub extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<string> {
        const res = await fetch(`https://github.com/login/oauth/access_token`, {
            method: "POST",
            body: JSON.stringify({
                client_id: env.github.clientId,
                client_secret: env.github.clientSecret,
                code: code,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.text();
        const token = new URLSearchParams(data).get("access_token");
        if (token == null)
            throw new UnauthorizedException("Connection github failed.");
        this.token = token;
        return token;
    }

    async revoke(): Promise<any> {
        // console.log()
        const clientId = env.github.clientId;
        const accessToken = "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";
        // const headers = {
        //     'Accept': 'application/vnd.github+json',
        //     'Authorization': `Bearer ${accessToken}`,
        //     'X-GitHub-Api-Version': '2022-11-28',
        // };
        const url = `https://api.github.com/applications/${clientId}/token`;

        const options = {
            method: "DELETE",
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${accessToken}`,
                "X-GitHub-Api-Version": "2022-11-28",
            },
            body: JSON.stringify({
                access_token: accessToken,
            }),
        };

        const response = await fetch(url, options);
        const data = await response.text();
        console.log(data);
        // console.log(await response.text())
        // if (response.ok) {
        //     console.log('Token revoked successfully');
        // } else {
        //     const errorResponse = await response.json();
        //     console.error(`Failed to revoke token: ${errorResponse.message}`);
        // }
        return response;
    }

    async getGithubEmail(): Promise<string> {
        const responseEmail = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${this.token}`,
                "X-GitHub-Api-Version": "2022-11-28",
            },
        });
        const resp = await responseEmail.json();
        const email = resp.email;
        return email;
    }
    async webhook(
        workflow_id: number,
        event: string,
        payload?: { repository: string }
    ): Promise<void> {
        if (!payload || !payload.repository) return;

        const response = await fetch(`https://api.github.com/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        const owner = (await response.json()).login;
        await fetch(
            `https://api.github.com/repos/${owner}/${
                payload!.repository
            }/hooks`,
            {
                method: "POST",
                body: JSON.stringify({
                    name: "web",
                    active: true,
                    events: [event],
                    config: {
                        url: `${env.app.host}/workflow/callback/${workflow_id}`,
                        // url: `https://www.google.fr`,
                        content_type: "json",
                        insecure_ssl: "0",
                    },
                }),
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }

    async field_issues(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }

    async field_push(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
    async field_pull_request(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
    async field_star(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
    async field_release(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
    async field_create(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
    async field_fork(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
    async field_status(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
    async field_repository(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
    async field_rename_repository(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
    async field_issue_creation(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }

    async rename_repository(
        payload?: Object & {
            repository: string;
            new_name: string;
        }
    ) {
        if (!payload || !payload.repository || !payload.new_name) return;
        const response = await axios.get(`https://api.github.com/user`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        const owner = response.data.login;
        await axios.patch(
            `https://api.github.com/repos/${owner}/${payload.repository}`,
            { name: payload.new_name },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }

    async issue_creation(
        payload?: Object & {
            repository: string;
            title: string;
            body?: string;
        }
    ) {
        if (!payload || !payload.repository || !payload.title) return;
        const response = await axios.get(`https://api.github.com/user`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        const owner = response.data.login;
        await axios.patch(
            `https://api.github.com/repos/${owner}/${payload.repository}/issues`,
            {
                title: payload.title,
                ...(payload.body != null && { body: payload.body }),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }

    async merge_branch(
        payload?: Object & {
            repository: string;
            base: string;
            head: string;
            commit_message: string;
        }
    ) {
        if (
            !payload ||
            !payload.repository ||
            !payload.base ||
            !payload.head ||
            !payload.commit_message
        )
            return;
        const response = await axios.get(`https://api.github.com/user`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        const owner = response.data.login;
        await axios.post(
            `https://api.github.com/repos/${owner}/${payload.repository}/merges`,
            {
                base: payload.base,
                head: payload.head,
                commit_message: payload.commit_message,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }
    async field_merge_branch(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }

    async create_pull_request(
        payload?: Object & {
            repository: string;
            base: string;
            head: string;
            title: string;
        }
    ) {
        if (
            !payload ||
            !payload.repository ||
            !payload.base ||
            !payload.head ||
            !payload.title
        )
            return;
        const response = await axios.get(`https://api.github.com/user`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        const owner = response.data.login;
        await axios.post(
            `https://api.github.com/repos/${owner}/${payload.repository}/pulls`,
            {
                title: payload.title,
                head: payload.head,
                base: payload.base,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
    }
    async field_create_pull_request(payload?: Field[]) {
        if (payload == null) return;

        return await Promise.all(
            payload?.map(
                async (
                    field: Field & {
                        options?: string[];
                    }
                ) => {
                    if (field.type == "select" && field.name == "repository") {
                        const response = await (
                            await fetch("https://api.github.com/user/repos", {
                                method: "get",
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            })
                        ).json();
                        field.options = response
                            .filter(
                                (
                                    repo: Object & {
                                        permissions: { admin: boolean };
                                    }
                                ) => repo.permissions.admin == true
                            )
                            .map(
                                (repo: Object & { name: string }) => repo.name
                            );
                    }
                    return field;
                }
            )
        );
    }
}
