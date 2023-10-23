import { Router } from 'express';
import * as ctr from '../Controll';
const router = Router();


router.get('/LoginSearchInfo',ctr.LoinSearchID);

router.post('/SuccesLogin',ctr.ChangeLoginValue);

router.post('/SuccesLogout',ctr.ChangeLoginValueToLogout);

export default router;