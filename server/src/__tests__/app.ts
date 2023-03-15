import { Express } from "@providers";
import { UserPayload } from "@types";
import { Jwt, Prisma } from "@providers";

const app = new Express().getApp();

const token = Jwt.sign(
    <UserPayload>{
        sub: 1,
        id: 1,
        email: "demo@area.com",
        admin: true,
    },
    { expiresIn: "1d" }
);


export default {app, token, Prisma};