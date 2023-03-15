import { genSalt, hash, compare } from "bcryptjs";

export class Bcrypt {
    hash = async (password: string): Promise<string> => {
        const salt = await genSalt(10);
        return await hash(password, salt);
    };

    compare = async (entry: string, password: string): Promise<boolean> => {
        return await compare(entry, password);
    };
}

export default new Bcrypt();
