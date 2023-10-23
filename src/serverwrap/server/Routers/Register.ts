
/*
const ctr = require("../Controll.ts");
const router = express.Router();

router.post('/saveInfo',ctr.SaveUserInfo);

router.get('/checkDuplication',ctr.CheckDuplicationID);



module.exports = router; */
import { Router } from 'express';
import * as ctr from '../Controll';
const router = Router();

router.post('/saveInfo', ctr.SaveUserInfo);
router.get('/checkDuplication', ctr.CheckDuplicationID);

export default router;