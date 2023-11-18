import { Router } from 'express';

import UserManager from '../../dao/userManager.js';

const router = Router();

router.post('/session/register', async (req, res) => {
    const { body } = req;
    try {
        await UserManager.createUser(body);
        res.redirect('/login');
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.post('/session/login', async (req, res) => {
    const { body: { email, password } } = req;
    try {
        const user = await UserManager.getUser(email, password);
        const { first_name, last_name, role } = user;
        req.session.user = { first_name, last_name, email, role };
        res.redirect('/products');
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.get('/session/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/login');
    });
});

export default router;