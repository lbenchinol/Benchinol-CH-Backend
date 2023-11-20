import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/session/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    res.redirect('/login');
});

router.post('/session/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
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