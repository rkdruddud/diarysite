import { Request, Response } from 'express';
import database from '../lib/db';
import nodemailer from 'nodemailer';
import { userInfo } from 'os';
import dotenv from 'dotenv';

/** 회원가입 정보 저장 */
export const SaveUserInfo = (req:Request,res:Response) =>{

    const userID = req.body.id;
    const password = req.body.pw;
    const phonNumber = req.body.phonNumber;
    const email = req.body.email;
    const name = req.body.name;
    const login:number = 0;

    database.query('INSERT INTO user (id, name, password, email, phonNumber, login) VALUES(?,?,?,?,?,?);', [userID, name, password, email, phonNumber, login],
     function (error: Error|null, results:any, fields:any){
        if(error){
           res.status(400).json({
                error:error
            })
        }
        else {
            console.log("회원가입성공");
          res.status(200).json({
                data: results.raws,
            })
        }

    });

}

/** 회원가입시 아이디 중복 체크 */
export const CheckDuplicationID = (req:Request,res:Response) =>{

    const userID = req.query.id;
    database.query('SELECT id FROM `user` WHERE `id` = ?;' ,userID,(error:any, data:any)=>{
        if(!error){
            if(data){
                console.log(data.raws);
                res.status(200).json({
                    data:data
                });
            }
            else {
                console.log("아이디 사용가능");
            }
        }
        
        if(error){
            
            res.status(400).json({
                error:error
            })
        
        }

    });
}


/**로그인 시 아이디와 비밀번호 이름 조회  */
export const LoinSearchID = (req:Request,res:Response)=>{

    const userID = req.query.id;

    database.query('SELECT id, password, name FROM `user` WHERE `id` = ?;',userID , (error:any, data:any) =>{

        if(!error){
            res.status(200).json({
                data:data
            })
        }

        if(error){
            res.status(400).json({
                error:error
            });
        }
    })
}

/** 로그인 성공시 Login값 변경 */

export const ChangeLoginValue = (req:Request,res:Response)=>{

    const userID = req.body.id;

    database.query('UPDATE `user` SET `login`=? WHERE `id` = ?;', ['1',userID],
    (error:any, data:any) =>{
        if(!error){
            console.log("로그인 성공");
            res.status(200).json({
                data:data
            });

        }
        if(error){
            res.status(400).json({
                error:error
            });
        }
    });
}

/** 로그 아웃 */
export const ChangeLoginValueToLogout = (req:Request,res:Response)=>{
    const userID = req.body.id;

    database.query('UPDATE `user` SET `login`=? WHERE `id`=?;',['0',userID],
    (error:any, data:any)=>{
        if(!error){
            res.status(200).json({
                data:data
            });
        }
        if(error){
            res.status(400).json({
                error:error
            });

        }
        
        
    });
}

/** 아이디 찾기 */

export const findID = (req:Request,res:Response) =>{
    const userName = req.query.name;
    const userPhonNumber = req.query.phonNumber;
   
    database.query('SELECT id FROM `user` WHERE `name` = ? AND `phonNumber` = ?', [userName, userPhonNumber],
     (error:any, data:any) =>{
        if(!error){
            res.status(200).json({
                data:data
            });
        }
        if(error){
            res.status(400).json({
                error:error
            })
        }
    } );
}


/** 비밀번호 변경 위한 이메일 확인*/

export const findEmailForChangePW = (req:Request,res:Response)=>{
    const userID = req.query.id;

    database.query('SELECT email FROM `user` WHERE `id` =?',userID,
    (error:any, data:any) =>{
        if(!error){
            res.status(200).json({
                data:data
            });
        }
        if(error){
            res.status(400).json({
                error:error
            });
        }
    });
}

/**비밀번호 변경 */

export const ChangePW = (req:Request,res:Response)=>{
    const userPW = req.body.pw;
    const userID = req.body.id;

    database.query('UPDATE `user` SET `password`=? WHERE `id` = ?;',[userPW, userID],
    (error:any, data:any)=>{
        if(!error){
            console.log('비밀번호 변경 성공');
            res.status(200).json({
                data:data
            });
        }
        if(error){
            res.status(400).json({
                error:error
            });
        }
    });
}


/** 비밀번호 변경을 위한 인증 메일 전송 */
export const SendEmail = async (req:Request,res:Response)=>{
    const toAdress = req.body.email;
    const secretkey = ((Math.round(Math.random() * 1000000)) + '').padStart(6, '0');

    const transporter = nodemailer.createTransport({
        service:'naver',
        host:'smtp.naver.com',
        port:587,
        secure:false,
        auth:{
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD
        },
    });


    try{
        const info = await transporter.sendMail({
            from: `"REACT_EXPRESS" <${process.env.GMAIL_ID}>`,
            to: toAdress,
            subject: '인증번호 입니다.',
            text: `인증번호는 : ${secretkey} 입니다.`    
        });

        res.send(`${secretkey}`);
    }
    catch(e){
        console.log(e);
    }
}

/**다이어리 유무 확인 */
export const DiaryExistence = (req:Request,res:Response)=>{

    const userID = req.query.id;
    const date = req.query.date;
    
    database.query('SELECT id, date, text FROM `diary` WHERE `id` = ? AND `date` = ?;',[userID,date] , (error:any, data:any) =>{
        
        if(!error){
            res.status(200).json({
                data:data
            })
        }

        if(error){
            res.status(400).json({
                error:error
            });
        }
    })
}

/**다이어리 수정 업데이트*/

export const DiaryUpdateText  = (req:Request,res:Response)=>{
    const userID = req.body.id;
    const text = req.body.text;
    const date = req.body.date;

    database.query('UPDATE `diary` SET `text`=? WHERE `id`=? AND `date`=?;',[text,userID,date],
    (error:any, data:any)=>{
        if(!error){
            res.status(200).json({
                data:data
            });
        }
        if(error){
            res.status(404).json({
                error:error
            });

        }
        
        
    });
}

/**다이어리 작성 내용 저장 */
export const CreateDiary = (req:Request,res:Response) =>{

    const userID = req.body.id;
    const text = req.body.text;
    const score = req.body.score;
    const date = req.body.date;
    const image = req.body.image;

    console.log(userID);
    console.log(text);
    console.log(date);
    console.log(image);
    console.log(score);

    database.query('INSERT INTO diary (id, date, text, image) VALUES(?,?,?,?);', [userID, date, text, image],
     function (error: Error|null, results:any, fields:any){
        if(error){
            console.log(error);
           res.status(400).json({
                error:error
            })
        }
        else {
          
          res.status(200).json({
                data: results.raws,
            })
        }

    });

}

/**다이어리 삭제 */
export const DeleteDiary = (req:Request,res:Response) =>{

    const userID = req.body.id;
    const date = req.body.date;

    database.query('DELETE FROM diary WHERE `id` = ? AND `date`=?;', [userID, date],
     function (error: Error|null, results:any, fields:any){
        if(error){
            console.log(error);
           res.status(400).json({
                error:error
            })
        }
        else {
          
          res.status(200).json({
                data: results.raws,
            })
        }

    });

}