import { Connector } from "@connectors";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { IConnector } from "@interfaces";
import { Environment as env } from "@providers";
import crypto from "crypto";
import axios from "axios";
import OAuth from "oauth-1.0a";

export class Twitter extends Connector implements IConnector {
    constructor(token?: string) {
        super(token);
    }

    async authenticate(code: string): Promise<string> {
        const query = code.split("&");
        const TWITTER_ENDPOINT_URL = `https://api.twitter.com/oauth/access_token?`
        const parameters = [
            `oauth_consumer_key=${env.twitter.apiKey}`,
            `oauth_token=${query[0]}`,
            `oauth_verifier=${query[1]}`,
        ].sort().join("&");

        const res = await fetch(`${TWITTER_ENDPOINT_URL}${parameters}`, {
            method: "POST",
        });

        const data = await res.text();
        const token = new URLSearchParams(data).get("oauth_token");

        if (token == null)
            throw new UnauthorizedException("Connection twitter failed.");
        console.log(data)
        return token;
    }

    async createWebhook(): Promise<void> {
        const url = 'https://api.twitter.com/1.1/account_activity/all/webhooks';
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer <OAuth2 bearer token>`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'url=<your webhook URL>'
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    };

    async post_tweet(access_token: string): Promise<any> {
        // const consumerKey = env.twitter.apiKey;
        // const consumerSecret = env.twitter.apiSecretKey;
        // const accessToken = access_token;
        // const accessTokenSecret = env.twitter.accessTokenSecret;

        // var data = JSON.stringify({
        //     "text": "Hello World v2!"
        // });

        // interface OAuth {
        //     oauth_consumer_key: string,
        //     oauth_nonce: string,
        //     oauth_signature_method: string,
        //     oauth_timestamp: string,
        //     oauth_token: string,
        //     oauth_version: string,
        // }
        // const oauth: OAuth = {
        //     oauth_consumer_key: consumerKey,
        //     oauth_nonce: crypto.randomBytes(16).toString('hex'),
        //     oauth_signature_method: 'HMAC-SHA1',
        //     oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
        //     oauth_token: this.token!,
        //     oauth_version: '1.0',
        // };
        // const nounce = crypto.randomBytes(16).toString("base64");
        // const timestamp = Math.floor(Date.now() / 1000).toString();
        // const signature = encodeURIComponent(env.twitter.apiSecretKey) + '&' + encodeURIComponent(env.twitter.accessTokenSecret);
        // const hmac = crypto.createHmac('sha1', signature);
        // const params = Object.keys(oauth:)
        //     .sort()
        //     .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(oauth[key].toString())}`)
        //     .join('&');
        // const message = `POST&${encodeURIComponent('https://api.twitter.com/2/tweets')}&${encodeURIComponent(params)}`;
        // const oauth_signature = hmac.digest('base64');
        // var config = {
        //     method: 'post',
        //     url: 'https://api.twitter.com/2/tweets',
        //     headers: {
        //         'Authorization': `OAuth oauth_consumer_key="${consumerKey}",oauth_token="${access_token}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${timestamp}",oauth_nonce="${nounce}",oauth_version="1.0",oauth_signature="${oauth['oauth_signature']}"`,
        //         'Content-Type': 'application/json',
        //         'Cookie': 'guest_id=v1%3A167421114497627497'
        //     },
        //     data: data
        // };

        // axios(config)
        //     .then(function (response: any) {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error: any) {
        //         console.log(error);
        //     });

        // .then(res => res.json())
        //     .then(data => console.log(data))
        //     .catch(err => console.error(err));
        return;
    }

    async webhook(workflow_id: number, event: string): Promise<void> {
        // TODO
    }




}
