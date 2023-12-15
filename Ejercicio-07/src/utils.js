import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
};

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (passwordFlat, passwordEncrypted) => bcrypt.compareSync(passwordFlat, passwordEncrypted);

export const JWT_SECRET_KEY = 'H@ww~+9#ntn:1A=Oy;]7E0';

export const tokenGenerator = (user) => {
    const { _id: id, first_name, last_name, email, role } = user;
    const payload = { id, first_name, last_name, email, role };
    return JWT.sign(payload, JWT_SECRET_KEY, { expiresIn: '1m' });
};

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                return reject(error);
            }
            resolve(payload);
        });
    });
};

export const authMiddleware = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, function(error, payload, info) {
      if (error) {
        return next(error);
      }
      if (!payload) {
        return res.status(401).json({ message: info.message ? info.message : info.toString() });
      }
      req.user = payload;
      next();
    })(req, res, next);
  };