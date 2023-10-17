import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./ChangePW.css";
import backgroundIMG from '../image/backgroundimg.jpg';

const ChangePW:React.FC = () =>{

    const [pwInfo, setPwInfo] = useState<string>('');
    const [changePwInfo, setChangePwInfo] = useState<string>('');

    const [pwValid, setPwValid] = useState<boolean>(false);
    const [pwCheckValid, setPwCheckValid] = useState<boolean>(false);

    const navigate = useNavigate();

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
        setChangePwInfo(e.target.value); 
        
        if(changePwInfo === pwInfo){
            setPwCheckValid(true);
        }else{
            setPwCheckValid(false);
        }
    }

    const twoMoveBackPage = () =>{
        navigate(-2);
    }

    return (
        <div className='changePW-contents'>
             <img src={backgroundIMG} className='changePW-backgroundimg'></img>
            <div className='changePW-wrap'>
                <div className='changePW-inner-wrap'>
                    <div className='changePW-input-wrap'>
                        <h1>비밀번호 변경</h1>
                        <div className='changePWinfo password'>
                            <input type="password" className='changePW-input password' value={pwInfo} onChange={pwHandle} placeholder='새 비밀번호'></input>
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

                        <div className='changePWinfo changePassword'>
                            <input type="password" className='changePW-input changePassword' value={changePwInfo} onChange={pwCheckHandle} placeholder='새 비밀번호 확인'></input>
                        </div>
                            
                        <div className='changePWBtn-wrap'>
                            <button className='changePWbtn' onClick={twoMoveBackPage}>확인</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChangePW;