import UserDao from '../dao/user.dao.js';

export default class UserService {
    static get(email) {
        return UserDao.get(email);
    }

    static getById(id) {
        return UserDao.getById(id);
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