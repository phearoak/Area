declare module "express-serve-static-core" {
    interface Request {
        user: UserPayload;
    }
}

interface UserPayload {
    id: number;
    email: string;
    admin: boolean;
}

export interface IEnvironment {
    node: string;
    isProduction: boolean;
    isTest: boolean;
    isDevelopment: boolean;
    app: {
        host: string;
        routePrefix: string;
    };
    db: {
        host: string;
        port: string;
        username: string;
        password: string;
    };
    jwt: {
        secret: string;
        name: string;
    };
    github: {
        clientId: string;
        clientSecret: string;
    };
    discord: {
        clientId: string;
        clientSecret: string;
    };
    spotify: {
        clientId: string;
        clientSecret: string;
    };
    dropbox: {
        clientId: string;
        clientSecret: string;
    };
    twitch: {
        clientId: string;
        clientSecret: string;
    };
    notion: {
        clientId: string;
        clientSecret: string;
    };
    google: {
        clientId: string;
        clientSecret: string;
    };
    facebook: {
        clientId: string;
        clientSecret: string;
    };
    instagram: {
        clientId: string;
        clientSecret: string;
    };
    twitter: {
        clientId: string;
        clientSecret: string;
        apiKey: string;
        apiSecretKey: string;
        bearerToken: string;
        accessToken: string;
        accessTokenSecret: string;
    };
    doors: {
        apiKey: string;
    }
    jira: {
        clientId: string;
        clientSecret: string;
    };
}

export interface UserDetails {
    userId: number;
    ipAddress: string;
    userAgent: string;
}

export interface ValidationSchema {
    [key: string]: ValidationChain | ValidationChain[];
}
