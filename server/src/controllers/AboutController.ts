import { ServiceService } from "@services";
import { NextFunction, Request, Response } from "express";

interface AboutJson {
    client: {
        host: string;
    };
    server: {
        current_time: number;
        services: [
            {
                name: string;
                actions: [
                    {
                        name: string;
                        description: string;
                    }
                ];
                reactions: [
                    {
                        name: string;
                        description: string;
                    }
                ];
            }
        ];
    };
}

class AboutController {
    about = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const services = await ServiceService.getAll();
            return res.status(200).json(<AboutJson>{
                client: {
                    host: <string>(
                        (
                            req.socket.remoteAddress ||
                            req.headers["x-forwarded-for"]
                        )
                            ?.toString()
                            .replace("::ffff:", "")
                    ),
                },
                server: {
                    current_time: Date.now(),
                    services: services.map((service) => {
                        return {
                            name: service.name,
                            actions: service.actions.map((action) => {
                                return {
                                    name: action.name,
                                    description: action.description,
                                };
                            }),
                            reactions: service.reactions.map((reaction) => {
                                return {
                                    name: reaction.name,
                                    description: reaction.description,
                                };
                            }),
                        };
                    }),
                },
            });
        } catch (err) {
            next(err);
        }
    };
}

export default new AboutController();
