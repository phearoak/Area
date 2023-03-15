import { Workflow } from "@prisma/client";
import { Prisma } from "@providers";

class WorkflowService {
    create = async (
        user_id: number,
        action_id: number,
        action_args?: string
    ): Promise<Workflow> => {
        return await Prisma.workflow.create({
            data: {
                user_id,
                action_id,
                action_args,
            },
        });
    };

    getById = async (workflow_id: number) => {
        return await Prisma.workflow.findUnique({
            where: {
                id: workflow_id,
            },
        });
    };
    existsAndGetById = async (id: number): Promise<Workflow | null> => {
        try {
            return await Prisma.workflow.findUnique({
                where: {
                    id,
                },
            });
        } catch {
            return null;
        }
    };
    existsById = async (workflow_id: number): Promise<boolean> => {
        try {
            const count = await Prisma.workflow.count({
                where: {
                    id: workflow_id,
                },
            });
            return count <= 0 ? false : true;
        } catch {
            return false;
        }
    };
    getAllInIds = async (ids: number[]) => {
        return await Prisma.workflow.findMany({
            where: {
                id: { in: ids },
            },
        });
    };
    getAllByUserId = async (user_id: number) => {
        return await Prisma.workflow.findMany({
            where: {
                user_id,
            },
            include: {
                workflow_reactions: true,
            },
        });
    };
}

export default new WorkflowService();
