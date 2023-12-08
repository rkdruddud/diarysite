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




const app = express();
const PORT = 5000;

//const PORT = process.env.PORT || 5000;


// 본인의 소스코드에서 apikey, domain이 적혀있는 env 파일을 지정.
dotenv.config({path: path.resolve(__dirname, "../../../.env")});

app.use(express.json());

/*const corsOptions = {
  origin: 'http://localhost:3000', // 클라이언트의 주소로 변경
  credentials: true,
};

app.use(cors(corsOptions));*/


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/Register', RegisterRouter);
app.use('/Login', LoginRouter);
app.use('/FindID', FindIDRouter);
app.use('/FindPW', FindPWRouter);
app.use('/UserHome', DiaryRouter);



app.use('/',(req, res, next)=>{
    res.status(404).send("Start Server");
});

app.listen(5000, function() {
    console.log('listening on 5000');
    
});
