import { Router } from "express";

const router = Router();

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts',{style: 'realtimeproducts.css'});
});

export default router;