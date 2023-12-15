import UserModel from '../models/user.model.js';

export default class UserDao {
    static get(email) {
        return UserModel.findOne({ email });
    }

    static getById(id) {
        return UserModel.findById(id);
    }

    static create(user) {
        return UserModel.create(user);
    }

    static updateById(id, userUpdated) {
        return UserModel.updateOne({ _id: id }, { $set: userUpdated });
    }

    static deleteById(id) {
        return UserModel.deleteOne({ _id: id });
    }
}