import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import './FindPW.css';

const FindPW:React.FC =()=>{

const [idInfo,setIdInfo] = useState<string>('');
const [emailInfo,setemailInfo] = useState<string>('');

const [idValid, setIDValid] = useState<boolean>(false);
const [emailValid, setEmailValid] = useState<boolean>(false);

const [emailCheckBtn, setEmailCheckBtn] = useState<string>('인증번호 전송');
const [showComponent, setShowComponent] = useState<string>('hidden-certificationNumber-wrap');

const navigate = useNavigate();

const idHandle = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setIdInfo(e.target.value);

    if(e.target.value.length>=3){
        setIDValid(true);
    }else{
        setIDValid(false);
    }
}

const emailHandle = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setemailInfo(e.target.value);
    
    const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
    if(regex.test(emailInfo)){
        setEmailValid(true);
    }else {
        setEmailValid(false);
    }
}

const moveChagePwPage = () =>{
    navigate('/ChangePW');
}

const moveBackPage = () =>{
    navigate(-1);
}

    const clickCheckEmailBtn = () =>{
        setEmailCheckBtn('인증번호 재전송');
        setShowComponent('certificationNumber-wrap');
    }

    return (
        <div className='findPW-contents'>
             <img src={backgroundimg} className='findPW-backgroundimg'></img>
            <div className='findPW-wrap'>
                <div className='findPW-inner-wrap'>
                    <div className='findPW-input-wrap'>
                        <h1>비밀번호 찾기</h1>
                        <div  className='findPWinfo id'>
                            <input type="text" className='findPW-input id' value={idInfo} onChange={idHandle} placeholder='아이디를 입력해주세요.'></input>
                            <div className='errorMessageWrap id'>
                        <div>
                            {
                                !idValid && 0<idInfo.length && (
                                    <div>아이디를 3자 이상 입력해주세요.</div>
                                )
                            }
                        </div>
                    </div>
                        </div>

                    <div className='findPWinfo email'>
                       
                        <div className='emailInput-wrap'>
                        <input type="email" className='findPW-input email' value={emailInfo} onChange={emailHandle} placeholder='이메일을 입력해주세요.'></input>
                        <button className="emailCheckBtn" onClick={clickCheckEmailBtn}>{emailCheckBtn}</button>
                        </div>
                            <div className='errorMessageWrap emailInfo'>
                                 <div>
                                 {
                                !emailValid && 0 < emailInfo.length && (
                                    <div>정확한 이메일을 입력해주세요.</div>
                                )
                                 }
                                 </div>
                             </div>
                    </div>

                    <div className={showComponent}>
                                 <div className='certificationNumber-input-wrap'>
                                 <input type="number" className='findPW-input checknumber' placeholder='인증번호 입력'></input>
                                 <button className='numberCheckBtn'>인증확인</button>
                                 </div>
                    </div>

                    <div className='findPW-btn-wrap'>
                             <button className='findPWBtn confirm' onClick={moveChagePwPage}>확인</button>
                             <button className='findPWBtn cancle' onClick={moveBackPage}>취소</button>    
                    </div>
                    </div>

                    
                </div>

            </div>
        </div>
    )
}

export default FindPW;