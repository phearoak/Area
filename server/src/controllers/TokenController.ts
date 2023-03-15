import { NextFunction, Request, Response } from "express";
import { ServiceService, TokenService } from "@services";
import { BadRequestException } from "@exceptions";

class TokenController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        const { service } = req.params;
        const { access_token } = req.body;
        try {
            if (!(await ServiceService.existsById(parseInt(service))))
                throw new BadRequestException("service_id unknown");

            const token = await TokenService.create(
                req.user.id,
                parseInt(service),
                access_token
            );
            return res.status(201).json(token);
        } catch (err) {
            next(err);
        }
    };
}

export default new TokenController();
