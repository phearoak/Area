import { NextFunction, Request, Response } from "express";
import { Reaction, Service } from "@prisma/client";
import {
    FieldService,
    ReactionService,
    ServiceService,
    TokenService,
} from "@services";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { ConnectorFactory } from "@connectors";

class ReactionController {
    fields = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const reaction = await ReactionService.getById(parseInt(id));
            if (reaction == null)
                throw new BadRequestException("Unknown reaction.");

            const token = await TokenService.getByServiceId(
                reaction.service.id,
                req.user.id
            );
            if (token == null)
                throw new UnauthorizedException(
                    "Not authenticated for the reaction's service."
                );

            const fields = await FieldService.getAllByReactionId(reaction.id);

            const connector = new ConnectorFactory().getConnector(
                reaction.service.name
            )(token.token);

            const fieldsToSend = await connector.field(reaction.name, fields);

            return res.status(200).json(fieldsToSend);
        } catch (err) {
            next(err);
        }
    };
    create = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.service;
        const { name, description } = req.body;
        try {
            if (!(await ServiceService.existsById(parseInt(id))))
                throw new BadRequestException("Service not exists.");
            const reaction = await ReactionService.create(
                parseInt(id),
                name,
                description
            );
            return res.status(201).json(reaction);
        } catch (err) {
            next(err);
        }
    };
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reaction = await ReactionService.getAll();
            if (!reaction)
                throw new BadRequestException("Reaction not exists.");
            const response = await Promise.all(
                reaction.map(
                    async (
                        react: Reaction & {
                            service_name?: string;
                        }
                    ) => {
                        const service = await ServiceService.getById(react.service_id);
                        if (service)
                            return {
                                ...react,
                                service_name: service.name,
                            };
                    }
                )
            );
            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    };
    read = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
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

export default new ReactionController();
