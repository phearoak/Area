import { Prisma } from "@providers";

class ReactionService {
    create = async (service_id: number, name: string, description: string) => {
        return await Prisma.reaction.create({
            data: {
                service_id,
                name,
                description,
            },
        });
    };
    existsById = async (reactionId: number): Promise<boolean> => {
        try {
            const count = await Prisma.user.count({
                where: {
                    id: reactionId,
                },
            });
            return count <= 0 ? false : true;
        } catch {
            return false;
        }
    };
    getAll = async () => {
        return await Prisma.reaction.findMany({
            include: { service: true },
        });
    };
    getAllInIds = async (ids: number[]) => {
        return await Prisma.reaction.findMany({
            where: {
                id: { in: ids },
            },
            include: { service: true },
        });
    };
    getById = async (id: number) => {
        return await Prisma.reaction.findUnique({
            where: {
                id,
            },
            include: { service: true },
        });
    };
    update = async () => { };
    delete = async () => { };
}

export default new ReactionService();
