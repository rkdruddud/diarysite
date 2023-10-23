import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import RegisterRouter from './Routers/Register.ts';
import LoginRouter from './Routers/Login.ts';
import FindIDRouter from './Routers/FindID.ts';
import FindPWRouter from './Routers/FindPW.ts';

const app = express();
const PORT = 5000;
/*
const useState = require('react');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000; //포트번호 설정

//const mysql = require('mysql');



const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');


// 메일을 보내기 위한 모듈 2가지
const dotenv = require('dotenv');
//const nodemailer = require('nodemailer');

*/

// 본인의 소스코드에서 apikey, domain이 적혀있는 env 파일을 지정.
dotenv.config({path: path.resolve(__dirname, "../../.env")});

//app.use(express.static(path.join(__dirname, '../../build')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

/*
const Register = require('./Routers/Register.ts');
app.use('/Register', Register);


const Login = require('./Routers/Login');
app.use('/Login', Login);


const FindID = require('./Routers/FindID');
app.use('/FindID', FindID);



const FindPW = require('./Routers/FindPW');
app.use('/FindPw', FindPW);
*/

app.use('/Register', RegisterRouter);
app.use('/Login', LoginRouter);
app.use('/FindID', FindIDRouter);
app.use('/FindPW', FindPWRouter);

app.listen(5000, function() {
    console.log('listening on 5000');
});

