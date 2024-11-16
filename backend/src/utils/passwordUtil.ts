import bcrypt from 'bcrypt';

export const comparePassword = async function (password: string, encryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
};

export const hashPassword = async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
    return await bcrypt.hash(password, saltRounds)
}