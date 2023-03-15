import { BadRequestException } from "@exceptions";
import { Field } from "@prisma/client";
import { FieldService } from "@services";
import { NextFunction, Request, Response } from "express";

class FieldController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        const { action_id, reaction_id, name, label, type, helper, required } =
            req.body;
        try {
            if (
                (action_id != null && reaction_id != null) ||
                (action_id == null && reaction_id == null)
            ) {
                throw new BadRequestException(
                    "{action_id} or {reaction_id} is expected but not both of them."
                );
            }

            const field = await FieldService.create(<
                Omit<Field, "id" | "updated_at" | "created_at">
                >{
                    action_id: action_id,
                    reaction_id: reaction_id,
                    name: name,
                    label: label,
                    type: type,
                    helper: helper,
                    required: required,
                });

            return res.status(201).json(field);
        } catch (err) {
            next(err);
        }
    };
    read = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const field = await FieldService.getById(parseInt(id));
            if (field == null) throw new BadRequestException("Unknown id.");

            return res.status(200).json(field);
        } catch (err) {
            next(err);
        }
    };
    update = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
        } catch (err) {
            next(err);
        }
    };
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
        } catch (err) {
            next(err);
        }
    };
}

export default new FieldController();
