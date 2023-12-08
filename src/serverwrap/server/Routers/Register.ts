
import { Router } from 'express';
import * as ctr from '../Controll';
const router = Router();

router.post('/saveInfo', ctr.SaveUserInfo);
router.get('/checkDuplication', ctr.CheckDuplicationID);

export default router;