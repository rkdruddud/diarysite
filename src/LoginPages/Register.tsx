import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import './Register.css';
import { url } from 'inspector';
import axios from "axios";

const Register:React.FC =()=>{

    const [idInfo, setIdInfo] = useState<string>('');
    const [pwInfo, setPwInfo] = useState<string>('');
    const [nameInfo, setNameInfo] = useState<string>('');
    const [phonNumberInfo, setPhonNumberInfo] = useState<string>('');
    const [pwCheckInfo, setpwCheckInfo] = useState<string>('');
    const [emailInfo, setEmailInfo] = useState<string>('');
    
    const [checkIdDuplication, setCheckIdDuplicationInfo] = useState<boolean>(false);
    const [checkPassWord, setCheckPassWord] = useState<string>('');
    const [checkDup, setCheckDup] = useState<boolean>(false);


    const [idValid, setIdValid] = useState<boolean>(false);
    const [pwValid, setPwValid] = useState<boolean>(false);
    const [pwCheckValid, setPwCheckValid] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [phonNumberValid, setPhonNumberValid] = useState<boolean>(false);

    const navigate = useNavigate();

    const idHandle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setIdInfo(e.target.value); 
        
        if(e.target.value.length>=3){
            setIdValid(true);
        }else{
            setIdValid(false);
        }
    }

    const pwHandle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setPwInfo(e.target.value); 
        
        const regex =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,50}$/;
        
        if(regex.test(pwInfo)){
            setPwValid(true);
        }else{
            setPwValid(false);
        }
    }

    const pwCheckHandle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setpwCheckInfo(e.target.value); 
        
        if(pwCheckInfo === pwInfo){
            setPwCheckValid(true);
        }else{
            setPwCheckValid(false);
        }
    }


    const emailHandle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmailInfo(e.target.value);

        const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(regex.test(emailInfo)){
            setEmailValid(true);
        }else {
            setEmailValid(false);
        }
    }

    const phonNumberHandle = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setPhonNumberInfo(e.target.value);

        const regex = /^01([0|1|6|7|8|0])-?([0-9]{3,4})-?([0-9]{4})$/;

        if(regex.test(phonNumberInfo)){
            setPhonNumberValid(true);
        }else {
            setPhonNumberValid(false);
        }
    }

    const duplicationCheckID = async () =>{  // 아이디 중복 체크
    
        if(!idValid){
            alert("아이디 형식을 맞춰주세요.");
        } 
        else{
          
            setCheckDup(true);
            let respons = await axios.get('http://localhost:5000/Register/checkDuplication',{
                params: {
                    'id' : idInfo
                }
             });
             try{
                console.log(respons.status);
                /*if(respons.data[0].id === idInfo){
                    alert("이미 존재하는 아이디 입니다.");
               }*/
             }
             catch(e){
                setCheckIdDuplicationInfo(true);
/*                alert("사용 가능한 아이디 입니다.");*/
             }
          
        }
    }
        
      


    return (
        <div className='register-contents'>
             <img src={backgroundimg} className='register-backgroundimg'></img>
            <div className='register-wrap'>
                <div className='register-inner-wrap'>
                    <div className='register-input-wrap'>
                    <h1>회원가입</h1>
                    <div className='input-registerInfo name'>
                    <input type='text' className='inputInfo name' placeholder='이름을 입력해주세요.'></input>
                    </div>
                    

                    <div className='input-registerInfo id'>
                        <div className='inputId-wrap'>
                        <input type="text" className='inputInfo id' value={idInfo} onChange={idHandle} placeholder='아이디를 3자 이상 입력해주세요.'></input>
                    <button className='duplicationIdCheckBtn' onClick={duplicationCheckID}>중복확인</button>    
                        </div>
                    
                    <div className='errorMessageWrap idInfo'>
                        <div>
                            {
                                !idValid && 0<idInfo.length && (
                                    <div>아이디를 3자 이상 입력해주세요.</div>
                                )
                            }
                        </div>
                    </div>
                    
                    </div>
                    
                    <div className='input-registerInfo password'>
                    <input type="password" className='inputInfo password' value={pwInfo} onChange={pwHandle} placeholder='비밀번호를 입력해주세요.'></input>
                    <div className='errorMessageWrap pwInfo'>
                        <div>
                            {
                                !pwValid && 0 < pwInfo.length && (
                                    <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                                )
                            }
                        </div>
                    </div>
                    </div>

                    <div className='input-registerInfo password-check'>
                    <input type="password" className='inputInfo password' value={pwCheckInfo} onChange={pwCheckHandle} placeholder='비밀번호를 재입력해주세요.'></input>
                    </div>

                    <div className='input-registerInfo phonNumber'>
                        <input type="tel" className='inputInfo phonNumber' value={phonNumberInfo} onChange={phonNumberHandle} placeholder='핸드폰 번호를 입력해주세요.'></input>
                        <div className='errorMessageWrap phonNumberInfo'>
                        <div>
                            {
                                !phonNumberValid && 0 < phonNumberInfo.length && (
                                    <div>정확한 핸드폰 번호를 입력해주세요.</div>
                                )
                            }
                        </div>
                   
                    </div>
                    </div>
                    

                    <div className='input-registerInfo email'>
                    <input type="email" className='inputInfo email' value={emailInfo} onChange={emailHandle} placeholder='이메일을 입력해주세요.'></input>
                    <div className='errorMessageWrap emailInfo'>
                        <div>
                            {
                                !emailValid && 0 < emailInfo.length && (
                                    <div>정확한 이메일을 입력해주세요. (비밀번호 찾을 때 사용)</div>
                                )
                            }
                        </div>
                    </div>
                    </div>

                    <div className='register-button-wrap'>
                            <button className='registerBtn confirm' onClick={()=>{navigate(-1);}}>확인</button>
                            <button className='registerBtn cancle' onClick={()=>{navigate(-1);}}>취소</button>
                    </div>


                    </div>
                    
                    

                </div>

            </div>
        </div>
    )
}

export default Register;