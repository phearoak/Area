import { NextFunction, Request, Response } from "express";
import { ServiceService, TokenService } from "@services";
import { BadRequestException } from "@exceptions";

class ServiceController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        const { name, description, title } = req.body;
        try {
            const service = await ServiceService.create(
                name,
                description,
                title
            );
            return res.status(201).json(service);
        } catch (err) {
            next(err);
        }
    };
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const service = await ServiceService.getAll();
            if (service == null)
                throw new BadRequestException("Unknown ServiceId.");
            return res.status(201).json(service);
        } catch (err) {
            next(err);
        }
    };
    read = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            // Get Service by ID inside params
            const service = await ServiceService.getById(parseInt(id));
            if (service == null)
                throw new BadRequestException("Unknown Service.");

            // Get Token by user ID and service ID
            const token = await TokenService.getByServiceId(
                service.id,
                req.user.id
            );

            // If token is null, user is not connected to the service
            if (token == null)
                return res.status(201).json({
                    ...service,
                    isConnected: false,
                });

            // If token.expires_in is null, it means the token doesn't have an expiration date, so the user is connected to the service
            if (token.expires_in == null)
                return res.status(201).json({
                    ...service,
                    isConnected: true,
                });

            const expires_in = Number(token.expires_in);
            const now = new Date();
            const token_updated_at = new Date(token.updated_at);
            const expirationTime = new Date(
                token_updated_at.getTime() + expires_in * 1000
            );

            // If token is expired, user is no longer connected to the service
            if (now >= expirationTime) {
                if (token_updated_at.getTime() + expires_in > now.getTime())
                    return res.status(201).json({
                        ...service,
                        isConnected: false,
                    });
            }
            return res.status(201).json({
                ...service,
                isConnected: true,
            });
        } catch (err) {
            next(err);
        }
    };
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (err) {
            next(err);
        }
    };
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (err) {
            next(err);
        }
    };
}

export default new ServiceController();
