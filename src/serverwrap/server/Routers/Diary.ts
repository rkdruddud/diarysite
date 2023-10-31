import { Router } from 'express';
import * as ctr from '../Controll';
const router = Router();

router.get('/diaryexistence',ctr.DiaryExistence);

export default router;