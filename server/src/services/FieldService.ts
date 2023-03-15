import { Field } from "@prisma/client";
import { Prisma } from "@providers";

class FieldService {
    create = async (field: Omit<Field, "id" | "updated_at" | "created_at">) => {
        return await Prisma.field.create({
            data: {
                action_id: field.action_id,
                reaction_id: field.reaction_id,
                name: field.name,
                label: field.label,
                type: field.type,
                required: field.required,
                helper: field.helper,
            },
        });
    };
    existsById = async (id: number): Promise<boolean> => {
        try {
            const count = await Prisma.field.count({
                where: {
                    id,
                },
            });
            return count <= 0 ? false : true;
        } catch {
            return false;
        }
    };
    getById = async (id: number) => {
        return await Prisma.field.findUnique({
            where: {
                id,
            },
        });
    };
    getAllByActionId = async (id: number) => {
        return await Prisma.field.findMany({
            where: {
                action_id: id,
            },
        });
    };
    getAllByReactionId = async (id: number) => {
        return await Prisma.field.findMany({
            where: {
                reaction_id: id,
            },
        });
    };
}

export default new FieldService();
