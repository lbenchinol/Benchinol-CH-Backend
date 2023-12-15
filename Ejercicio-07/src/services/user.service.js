import UserDao from '../dao/user.dao.js';

export default class UserService {
    static async get(email) {
        return await UserDao.get(email);
    }

    static async getById(id) {
        return await UserDao.getById(id);
    }

    static create(user) {
        return UserDao.create(user);
    }

    static updateById(id, userUpdated) {
        return UserDao.updateById(id, userUpdated);
    }

    static deleteById(id) {
        return UserDao.deleteById(id);
    }
}