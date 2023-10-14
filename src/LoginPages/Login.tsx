import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import "./Login.css";


const Login:React.FC =()=>{
    return (
        <div className='login-contents'>
            <img src={backgroundimg} className='login-backgroundimg'></img>
            <div className='login-wrap'>
                <div className='login-inner-wrap'>
                    <input type='text' className='input-id' placeholder='  아이디를 입력해주세요.'></input>
                    <input type='password' className='input-pw' placeholder='  비밀번호를 입력해주세요.'></input>
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