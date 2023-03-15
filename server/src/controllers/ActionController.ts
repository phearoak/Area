import { NextFunction, Request, Response } from "express";
import { Action, Service } from "@prisma/client";
import {
    ActionService,
    FieldService,
    ServiceService,
    TokenService,
} from "@services";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { ConnectorFactory } from "@connectors";

class ActionController {
    fields = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const action = await ActionService.getById(parseInt(id));
            if (action == null)
                throw new BadRequestException("Unknown action.");

            const token = await TokenService.getByServiceId(
                action.service.id,
                req.user.id
            );
            if (token == null)
                throw new UnauthorizedException(
                    "Not authenticated for the action's service."
                );

            const fields = await FieldService.getAllByActionId(action.id);

            const connector = new ConnectorFactory().getConnector(
                action.service.name
            )(token.token);

            const fieldsToSend = await connector.field(action.name, fields);

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
            const action = await ActionService.create(
                parseInt(id),
                name,
                description
            );
            return res.status(201).json(action);
        } catch (err) {
            next(err);
        }
    };
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const action = await ActionService.getAll();
            if (!action)
                throw new BadRequestException("Action not exists.");
            const response = await Promise.all(
                action.map(
                    async (
                        react: Action & {
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
        const { id } = req.params;
        try {
            const action = await ActionService.getById(parseInt(id));
            if (!action)
                throw new BadRequestException("Action not exists.");
            return res.status(200).json(action);
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

export default new ActionController();
