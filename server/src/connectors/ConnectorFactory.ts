import { IConnector } from "@interfaces";
import {
    Discord,
    Facebook,
    GitHub,
    Gmail,
    Instagram,
    Slack,
    Spotify,
    Twitter,
    Youtube,
} from "@connectors";

export class ConnectorFactory {
    private classes: {
        [key: string]: new (token?: string) => IConnector;
    };

    constructor() {
        this.classes = {
            github: GitHub,
            discord: Discord,
            youtube: Youtube,
            twitter: Twitter,
            instagram: Instagram,
            slack: Slack,
            spotify: Spotify,
            facebook: Facebook,
            gmail: Gmail,
        };
    }

    getConnector(service_name: string): (token?: string) => IConnector {
        return (token?: string) =>
            new this.classes[service_name.toLowerCase()](token);
    }
}
