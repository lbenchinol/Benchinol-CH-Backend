import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/session/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    res.redirect('/login');
});

router.post('/session/login', passport.authenticate('jwt', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    const { token } = req.user;
    res
        .status(200)
        .cookie('access_token', token, { maxAge: 60000, httpOnly: true, signed: true })
        .json({ message: 'Inicio de sesión exitoso!' })
        .redirect('/products');
});

router.post('/session/local', passport.authenticate('local', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    const { token } = req.user;
    res
        .status(200)
        .cookie('access_token', token, { maxAge: 60000, httpOnly: true, signed: true })
        .json({ message: 'Inicio de sesión exitoso!' })
        .redirect('/products');
});

router.get('/session/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/session/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
});

router.get('/session/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/login');
    });
});

export default router;