import { User } from "@prisma/client";
import { Prisma } from "@providers";

class UserService {
    create = async (
        email: string,
        password: string | undefined,
        google: boolean | undefined
    ): Promise<User> => {
        return await Prisma.user.create({
            data: {
                email: email,
                password: password,
                google: google == null ? false : google,
            },
        });
    };

    existsByEmail = async (email: string): Promise<boolean> => {
        try {
            const count = await Prisma.user.count({
                where: {
                    email: email,
                },
            });
            return count <= 0 ? false : true;
        } catch {
            return false;
        }
    };

    existsAndGetByEmail = async (email: string): Promise<User | null> => {
        try {
            return await Prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
        } catch {
            return null;
        }
    };

    getUserById = async (id: number): Promise<User | null> => {
        try {
            return await Prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
        } catch {
            return null;
        }
    };
}

export default new UserService();
