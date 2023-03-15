import { Prisma } from "@providers";

class ActionService {
    create = async (service_id: number, name: string, description: string) => {
        return await Prisma.action.create({
            data: {
                service_id,
                name,
                description,
            },
        });
    };
    existsById = async (actionId: number): Promise<boolean> => {
        try {
            const count = await Prisma.action.count({
                where: {
                    id: actionId,
                },
            });
            return count <= 0 ? false : true;
        } catch {
            return false;
        }
    };
    getAll = async () => {
        return await Prisma.action.findMany({
            include: { service: true },
        });
    };
    existsAndGetById = async (actionId: number) => {
        try {
            return await Prisma.action.findUnique({
                where: {
                    id: actionId,
                },
                include: {
                    service: true,
                },
            });
        } catch {
            return null;
        }
    };
    getById = async (id: number) => {
        return await Prisma.action.findUnique({
            where: {
                id,
            },
            include: {
                service: true,
            },
        });
    };
    update = async () => { };
    delete = async () => { };
}

export default new ActionService();
