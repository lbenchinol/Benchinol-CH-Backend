import { Exception } from '../utils.js';
import UserModel from '../models/user.model.js';

const userAdmin = { first_name: 'Coder', last_name: 'House', email: 'adminCoder@coder.com', password: 'adminCod3r123', role: 'admin' };

export default class UserManager {
    static async createUser(body) {
        const { first_name, last_name, email, age: ageString, password } = body;

        first_name !== "" ? first_name.trim() : first_name;
        last_name !== "" ? last_name.trim() : last_name;
        email !== "" ? email.trim() : email;
        password !== "" ? password.trim() : password;
        const age = Number(ageString);

        if (first_name == "" || last_name == "" || email == "" || age < 18 || password == "") {
            throw new Exception('Ingrese los valores correctamente', 400);
        }
        const newUser = { first_name, last_name, email, age, password };

        await UserModel.create(newUser);
    }

    static async getUser(email, password) {
        email !== "" ? email.trim() : email;
        password !== "" ? password.trim() : password;

        if (email == "" || password == "") {
            throw new Exception('Ingrese los valores correctamente', 400);
        }

        //      HARDCODEADO
        if (email === userAdmin.email && password === userAdmin.password) {
            return { first_name: userAdmin.first_name, last_name: userAdmin.last_name, email: userAdmin.email, role: userAdmin.role };
        }


        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Exception('Correo o contraseña incorrentos', 401);
        }
        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
            throw new Exception('Correo o contraseña incorrentos', 401);
        }
        const { first_name, last_name, role } = user;
        return { first_name, last_name, email, role };
    }
}