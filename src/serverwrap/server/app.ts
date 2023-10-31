import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import RegisterRouter from './Routers/Register';
import LoginRouter from './Routers/Login';
import FindIDRouter from './Routers/FindID';
import FindPWRouter from './Routers/FindPW';
import DiaryRouter from './Routers/Diary';
import multer from 'multer';
import fs from 'fs';


const app = express();
const PORT = 5000;

// 본인의 소스코드에서 apikey, domain이 적혀있는 env 파일을 지정.
dotenv.config({path: path.resolve(__dirname, "../../../.env")});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/Register', RegisterRouter);
app.use('/Login', LoginRouter);
app.use('/FindID', FindIDRouter);
app.use('/FindPW', FindPWRouter);
app.use('/UserHome', DiaryRouter);

app.listen(5000, function() {
    console.log('listening on 5000');
});

