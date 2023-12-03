import { Exception, createHash, isValidPassword, tokenGenerator, verifyToken } from '../utils.js';
import UserModel from '../models/user.model.js';
import CartManager from './cartManager.js';

const userAdmin = { first_name: 'Coder', last_name: 'House', email: 'adminCoder@coder.com', password: 'adminCod3r123', role: 'admin' };

export default class UserManager {
    static async createUser(body) {
        const { first_name, last_name, email, age, password, provider = 'Local' } = body;

        first_name !== "" ? first_name.trim() : first_name;
        last_name !== "" ? last_name.trim() : last_name;
        email !== "" ? email.trim() : email;
        password !== "" ? password.trim() : password;
        age !== "" ? Number(age) : age;

        if (provider == 'Local') {
            if (first_name == "" || last_name == "" || email == "" || age < 18 || password == "") {
                throw new Exception('Ingrese los valores correctamente', 400);
            }
        } else {
            if (first_name == "" || email == "") {
                throw new Exception('Ingrese los valores correctamente', 400);
            }
        }
        const cart = await CartManager.addCart();
        const newUser = { first_name, last_name, email, age, password: createHash(password), provider, cart: cart._id };

        return await UserModel.create(newUser);
    }

    static async getUser(email, password) {
        email !== "" ? email.trim() : email;
        password !== "" ? password.trim() : password;

        if (email == "" || password == "") {
            throw new Exception('Ingrese los valores correctamente', 400);
        }

        //      HARDCODEADO
        if (email === userAdmin.email && password === userAdmin.password) {
            const token = tokenGenerator(userAdmin);
            return { first_name: userAdmin.first_name, last_name: userAdmin.last_name, email: userAdmin.email, role: userAdmin.role, token };
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Exception('Correo o contraseña incorrectos', 404);
        }

        const isPasswordValid = isValidPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Exception('Correo o contraseña incorrectos', 404);
        }

        const token = tokenGenerator(user);

        const { _id, first_name, last_name, role } = user;
        return { _id, first_name, last_name, email, role, token };
    }

    static async findUser(email) {
        email !== "" ? email.trim() : email;

        if (email == "") {
            throw new Exception('Ingrese los valores correctamente', 400);
        }

        //      HARDCODEADO
        if (email === userAdmin.email && password === userAdmin.password) {
            return { first_name: userAdmin.first_name, last_name: userAdmin.last_name, email: userAdmin.email, role: userAdmin.role };
        }

        return await UserModel.findOne({ email });
    }

    static async findUserById(uid) {
        uid !== "" ? uid.trim() : uid;

        if (uid == "") {
            throw new Exception('Ingrese los valores correctamente', 400);
        }

        return await UserModel.findById(uid);
    }
}