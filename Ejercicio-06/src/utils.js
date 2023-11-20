import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
}

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (passwordFlat, passwordEncrypted) => bcrypt.compareSync(passwordFlat, passwordEncrypted);