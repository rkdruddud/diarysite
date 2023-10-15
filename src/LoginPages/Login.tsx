import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import logoimg from '../image/logo.jpg';
import "./Login.css";


const Login:React.FC =()=>{


    const [id, setID] = useState<string>('');
    const [pw, setPW] = useState<string>('');

    const [idValid, setIDValid] = useState<boolean>(false);
    const [pwValid, setPWValid] = useState<boolean>(false);

    const idHandle = (e : React.ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value); 
        
        if(e.target.value.length>=3){
            setIDValid(true);
        }else{
            setIDValid(false);
        }
    }


    const pwHandle = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPW(e.target.value); 
        
        const regex =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,50}$/;
        
        if(regex.test(pw)){
            setPWValid(true);
        }else{
            setPWValid(false);
        }
    }


    return (
        <div className='login-contents'>
            <img src={backgroundimg} className='login-backgroundimg'></img>
            <div className='login-wrap'>
                <div className='login-inner-wrap'>
                    <div className='logo-wrap'>
                        <img src={logoimg}></img>
                        <p>Welcome to DiaryQest</p>
                    </div>

                    <div className='input-id-wrap'>
                    <input type='text' className='input-id' value={id} onChange={idHandle} placeholder='  아이디를 입력해주세요.'></input>
                    <div className='errorMessageWrap id'>
                        <div>
                            {
                                !idValid && 0<id.length && (
                                    <div>아이디를 3자 이상 입력해주세요.</div>
                                )
                            }
                        </div>
                    </div>
                    
                    </div>
                    
                    <div className='input-pw-wrap'>
                    <input type='password' className='input-pw' value={pw} onChange={pwHandle} placeholder='  비밀번호를 입력해주세요.'></input>
                    <div className='errorMessageWrap password'>
                        <div>
                            {
                                !pwValid && 0 < pw.length && (
                                    <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                                )
                            }
                        </div>
                    </div>
                    
                    </div>
                    
                    <div className='etc-wrap'>
                        <span><Link to="/Register" className='etc-link'>회원가입</Link></span>           
                        <span><Link to="/FindID" className='etc-link'>ID찾기</Link></span>           
                        <span><Link to="/FindPW" className='etc-link'>비밀번호 찾기</Link></span>           
                    </div>
                    <button className='login-button'>로그인</button>
                </div>

            </div>
        </div>
    )
}

export default Login;