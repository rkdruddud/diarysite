import { Router } from 'express';
import * as ctr from '../Controll.ts';
const router = Router();

router.get('/findID',ctr.findID);

export default router;