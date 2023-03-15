import { Service } from "@prisma/client";
import { Prisma } from "@providers";

class ServiceService {
    create = async (name: string, description: string, title: string) => {
        return await Prisma.service.create({
            data: {
                name,
                description,
                title,
            },
        });
    };
    getById = async (id: number) => {
        return await Prisma.service.findUnique({
            where: {
                id,
            },
        });
    };
    getAll = async () => {
        return await Prisma.service.findMany({
            include: {
                reactions: true,
                actions: true,
            },
        });
    };
    existsById = async (serviceId: number): Promise<boolean> => {
        try {
            const count = await Prisma.service.count({
                where: {
                    id: serviceId,
                },
            });
            return count <= 0 ? false : true;
        } catch {
            return false;
        }
    };
    existsAndGetById = async (serviceId: number): Promise<Service | null> => {
        try {
            return await Prisma.service.findUnique({
                where: {
                    id: serviceId,
                },
            });
        } catch {
            return null;
        }
    };

    getServiceByName = async (serviceName: string): Promise<Service | null> => {
        try {
            return await Prisma.service.findUnique({
                where: {
                    name: serviceName,
                },
            });
        } catch {
            return null;
        }
    };
}

export default new ServiceService();
