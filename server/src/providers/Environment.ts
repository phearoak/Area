import type { IEnvironment } from "@types";
import { config } from "dotenv";
import { join } from "path";

config({
    path: join(
        process.cwd(),
        `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`
    ),
});

function required(key: string): string {
    if (typeof process.env[key] === "undefined") {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
}

function optional(key: string): string | undefined {
    return process.env[key];
}

function toNumber(value: string): number {
    return parseInt(value, 10);
}

function toBool(value: string): boolean {
    return value === "true";
}

class Environment {
    private static env: IEnvironment;

    static getVariables = (): IEnvironment => {
        if (this.env == null)
            this.env = {
                node: process.env.NODE_ENV || "development",
                isProduction: process.env.NODE_ENV === "production",
                isTest: process.env.NODE_ENV === "test",
                isDevelopment: process.env.NODE_ENV === "development",
                app: {
                    host: required("API_HOST"),
                    routePrefix: required("API_ROUTE_PREFIX"),
                },
                db: {
                    host: required("MYSQL_HOST"),
                    port: required("MYSQL_PORT"),
                    username: required("MYSQL_USERNAME"),
                    password: required("MYSQL_PASSWORD"),
                },
                jwt: {
                    secret: required("JWT_SECRET"),
                    name: required("JWT_NAME"),
                },
                github: {
                    clientId: required("GITHUB_CLIENT_ID"),
                    clientSecret: required("GITHUB_CLIENT_SECRET"),
                },
                discord: {
                    clientId: required("DISCORD_CLIENT_ID"),
                    clientSecret: required("DISCORD_CLIENT_SECRET"),
                },
                spotify: {
                    clientId: required("SPOTIFY_CLIENT_ID"),
                    clientSecret: required("SPOTIFY_CLIENT_SECRET"),
                },
                dropbox: {
                    clientId: required("DROPBOX_CLIENT_ID"),
                    clientSecret: required("DROPBOX_CLIENT_SECRET"),
                },
                twitch: {
                    clientId: required("TWITCH_CLIENT_ID"),
                    clientSecret: required("TWITCH_CLIENT_SECRET"),
                },
                twitter: {
                    clientId: required("TWITTER_CLIENT_ID"),
                    clientSecret: required("TWITTER_CLIENT_SECRET"),
                    apiKey: required("TWITTER_API_KEY"),
                    apiSecretKey: required("TWITTER_API_SECRET_KEY"),
                    bearerToken: required("TWITTER_BEARER_TOKEN"),
                    accessToken: required("TWITTER_ACCESS_TOKEN"),
                    accessTokenSecret: required("TWITTER_ACCESS_TOKEN_SECRET"),
                },
                notion: {
                    clientId: required("NOTION_CLIENT_ID"),
                    clientSecret: required("NOTION_CLIENT_SECRET"),
                },
                google: {
                    clientId: required("GOOGLE_CLIENT_ID"),
                    clientSecret: required("GOOGLE_CLIENT_SECRET"),
                },
                facebook: {
                    clientId: required("FACEBOOK_CLIENT_ID"),
                    clientSecret: required("FACEBOOK_CLIENT_SECRET"),
                },
                instagram: {
                    clientId: required("INSTAGRAM_CLIENT_ID"),
                    clientSecret: required("INSTAGRAM_CLIENT_SECRET"),
                },
                doors: {
                    apiKey: required("DOORS_API_KEY"),
                },
                jira: {
                    clientId: required("JIRA_CLIENT_ID"),
                    clientSecret: required("JIRA_CLIENT_SECRET"),
                },
            };
        return this.env;
    };
}

export default Environment.getVariables();
