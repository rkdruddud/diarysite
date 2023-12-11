import { Router } from 'express';
import * as ctr from '../Controll';
const router = Router();

router.get('/diaryexistence',ctr.DiaryExistence);
router.post('/diaryUpdateText', ctr.DiaryUpdateText);
router.post('/creatediary',ctr.CreateDiary);
router.post('/deletediary',ctr.DeleteDiary);
router.get('/diaryImageFileSearch',ctr.DiaryImageFileSearch);
router.get('/getWrittenDiaryDate',ctr.GetWrittenDiaryDate);

export default router;