import { Router } from 'express';
import Referrals from '../models/referrals';

let router = Router();

router.get('/:id', (req, res) => {
    let id = req.params.id;

    if (Referrals.getInvite(id)) {
        return res.status(200);
    } else {
        return res.status(404);
    }

});

router.post('/', (req, res) => {

});

export default router;