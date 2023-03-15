import { Jwt } from "@providers";
import { NextFunction, Request, Response } from "express";
import { ServiceService } from "@services";
import { TokenService } from "@services";
import { UserService } from "@services";
import { Environment as env } from "@providers";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import {
    GitHub,
    Discord,
    Twitter,
    Slack,
    Notion,
    Gmail,
    Youtube,
} from "@connectors";


class RevokeController {
    github = async (req: Request, res: Response, next: NextFunction) => {
        // const { id } = req.user;
        try {
            const service = await ServiceService.getServiceByName("github");
            if (!service) throw new BadRequestException("Service not found");

            const token = await TokenService.getByServiceId(service.id, 1);
            if (!token) throw new BadRequestException("Token not found");

            const github = new GitHub("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");

            const response = await github.revoke();

            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    };

    gmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json("gmail");
        } catch (err) {
            next(err);
        }
    };

    youtube = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json("youtube");
        } catch (err) {
            next(err);
        }
    };

    discord = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json("discord");
        } catch (err) {
            next(err);
        }
    };

    stripe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(404).json("Stripe service pending...");
        } catch (err) {
            next(err);
        }
    };

    twitter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json("twitter");
        } catch (err) {
            next(err);
        }
    };

    slack = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json("slack");
        } catch (err) {
            next(err);
        }
    };

    notion = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json("notion");
        } catch (err) {
            next(err);
        }
    };

    spotify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json("spotify")
        } catch (err) {
            next(err);
        }
    };
}

export default new RevokeController();
