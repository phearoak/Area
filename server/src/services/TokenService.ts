import { Prisma } from "@providers";

class TokenService {
    create = async (user_id: number, service_id: number, token: string) => {
        return await Prisma.token.create({
            data: {
                user_id,
                service_id,
                token,
            },
        });
    };
    delete = async (user_id: number, service_id: number, token: string) => {
        return await Prisma.token.delete({
            where: {
                user_service_id: {
                    user_id,
                    service_id,
                },
            },
        });
    };
    getByServiceId = async (service_id: number, user_id: number) => {
        return await Prisma.token.findFirst({
            where: {
                AND: {
                    service_id,
                    user_id,
                },
            },
        });
    };
    getAllInServiceIdsAndById = async (ids: number[], user_id: number) => {
        return await Prisma.token.findMany({
            where: {
                AND: {
                    service_id: { in: ids },
                    user_id: user_id,
                },
            },
        });
    };
    updateTokenByOneId = async (
        user_id: number,
        service_id: number,
        token: string,
        refresh_token?: string,
        expires_in?: string
    ) => {
        return await Prisma.token.upsert({
            where: {
                user_service_id: {
                    user_id: user_id,
                    service_id: service_id,
                },
            },
            update: {
                token: token,
                refresh_token: refresh_token,
                expires_in: expires_in,
            },
            create: {
                token: token,
                user_id: user_id,
                service_id: service_id,
                refresh_token: refresh_token,
                expires_in: expires_in,
            },
        });
    };
    getByAccessToken = async (access_token: string) => {
        return await Prisma.token.findFirst({
            where: {
                token: access_token,
            },
        });
    };
}

export default new TokenService();
