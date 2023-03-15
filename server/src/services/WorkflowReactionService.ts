import { WorkflowReaction } from "@prisma/client";
import { Prisma } from "@providers";

class WorkflowReactionService {
    create = async (
        workflow_id: number,
        reaction_id: number,
        args?: string
    ): Promise<WorkflowReaction> => {
        return await Prisma.workflowReaction.create({
            data: {
                workflow_id,
                reaction_id,
                args,
            },
        });
    };
    getReactionsByWorkflowId = async (workflow_id: number) => {
        return await Prisma.workflowReaction.findMany({
            where: { id: workflow_id },
            include: {
                reaction: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        service: true,
                        updated_at: true,
                        created_at: true,
                    },
                },
            },
        });
    };
}

export default new WorkflowReactionService();
