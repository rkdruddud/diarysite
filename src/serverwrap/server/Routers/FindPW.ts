import { Router } from 'express';
import * as ctr from '../Controll';

const router = Router();

router.get('/findemailforchangepw',ctr.findEmailForChangePW);

router.post('/changepw',ctr.ChangePW);

router.post('/sendemail',ctr.SendEmail);


export default router;

