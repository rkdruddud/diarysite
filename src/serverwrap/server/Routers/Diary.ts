import { Router } from 'express';
import * as ctr from '../Controll';
const router = Router();

router.get('/diaryexistence',ctr.DiaryExistence);
router.post('/diaryUpdateText', ctr.DiaryUpdateText);
router.post('/creatediary',ctr.CreateDiary);
router.post('/deletediary',ctr.DeleteDiary);

export default router;