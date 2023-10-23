import { Request, Response } from 'express';
import database from '../lib/db';
import nodemailer from 'nodemailer';

/** 회원가입 정보 저장 */
export const SaveUserInfo = (req:Request,res:Response) =>{

    const userID = req.body.id;
    const password = req.body.pw;
    const phonNumber = req.body.phonNumber;
    const email = req.body.email;
    const name = req.body.name;
    const login:number = 0;

    database.query('INSERT INTO userinfo (id, name, password, email, phonNumber, login) VALUES(?,?,?,?,?,?);', [userID, name, password, email, phonNumber, login],
     function (error: Error|null, results:any, fields:any){
        if(error) throw error;
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

    const params:string = req.params.id;
    database.query('SELECT id FROM `userinfo` WHERE `id` = ?;'
    ,params,(error:any, data:any)=>{
        if(!error){
            if(data){
                res.status(200).json({
                    data:data.raws
                });
            }
            else {
                console.log("아이디 사용가능");
            }
        }
        
        if(error){
            res.send(error);
        }

    });
}


/**로그인 시 아이디와 비밀번호 조회  */
export const LoinSearchID = (req:Request,res:Response)=>{

    const params = req.params.id;

    database.query('SELECT id, password FROM `userinfo` WHERE `id` = ?;',params 
    , (error:any, data:any) =>{

        if(!error){
            res.status(200).json({
                data:data
            })
        }

        if(error){
            res.send(error);
        }
    })
}

/** 로그인 성공시 Login값 변경 */

export const ChangeLoginValue = (req:Request,res:Response)=>{

    const userID = req.body.id;

    database.query('UPDATE `userinfo` SET `login`=? WHERE `id` = ?;', ['1',userID],
    (error:any, data:any) =>{
        if(!error){
            console.log("로그인 성공");
            res.status(200).json({
                data:data.raws
            });

        }
        if(error){
            res.send(error);
        }
    });
}

/** 로그 아웃 */
export const ChangeLoginValueToLogout = (req:Request,res:Response)=>{
    const userID = req.body.id;

    database.query('UPDATE `userinfo` SET `login`=? WHERE `id`=?;',['0',userID],
    (error:any, data:any)=>{
        if(!error){
            res.status(200).json({
                data:data
            });
        }
        if(error){
            res.send(error);
        }
        
        
    });
}

/** 아이디 찾기 */

export const findID = (req:Request,res:Response) =>{
    const userName = req.query.name;
    const userPhonNumber = req.query.phonNumber;

    database.query('SELECT id FROM `userinfo` WHERE `name` = ? AND `phonNumber` = ?', [userName, userPhonNumber],
     (error:any, data:any) =>{
        if(!error){
            res.status(200).json({
                data:data
            });
        }
        if(error){
            res.send(error);
        }
    } );
}


/** 비밀번호 변경 위한 이메일 확인*/

export const findEmailForChangePW = (req:Request,res:Response)=>{
    const params = req.params.id;

    database.query('SELECT email FROM `userinfo` WHERE `id` =?',params,
    (error:any, data:any) =>{
        if(!error){
            res.status(200).json({
                data:data
            })
        }
        if(error){
            res.send(error);
        }
    });
}

/**비밀번호 변경 */

export const ChangePW = (req:any,res:any)=>{
    const userPW = req.body.changePW;
    const userID = req.body.id;

    database.query('UPDATE `userinfo` SET `password`=? WHERE `id` = ?;',[userPW, userID],
    (error:any, data:any)=>{
        if(!error){
            res.status(200).json({
                data:data
            });
        }
        if(error){
            res.send(error);
        }
    });
}


/** 비밀번호 변경을 위한 인증 메일 전송 */
export const SendEmail = async (req:Request,res:Response)=>{
    const toAdress = req.body.emil;
    const secretkey = ((Math.round(Math.random() * 1000000)) + '').padStart(6, '0');

    const transporter = nodemailer.createTransport({
        service:'naver',
        host:'smtp.naver.com',
        port:465,
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




