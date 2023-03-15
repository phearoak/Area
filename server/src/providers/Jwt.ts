import { SignOptions, verify, sign } from "jsonwebtoken";
import { Environment as env } from "@providers";

export class Jwt {
    sign = (payload: Object, options: SignOptions = {}) => {
        return sign(payload, env.jwt.secret, {
            ...(options && options),
        });
    };

    verify = <T>(token: string): T | null => {
        try {
            return verify(token, env.jwt.secret) as T;
        } catch (error) {
            return null;
        }
    };
}

export default new Jwt();
