import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import logoimg from '../image/logo.jpg';
import "./Login.css";
import axios from 'axios';
import userinfo from '../Reducer/store'
import { useDispatch } from 'react-redux'; 

const Login:React.FC =()=>{


    const [id, setID] = useState<string>('');
    const [pw, setPW] = useState<string>('');

    const [idValid, setIDValid] = useState<boolean>(false);
    const [pwValid, setPWValid] = useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        
        const regex =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{7,50}$/;
        
        if(regex.test(pw)){
            setPWValid(true);
        }else{
            setPWValid(false);
        }
    }

    const moveBackPage = () =>{
        navigate(-1);
    }

    const changeLoginValue = () =>{
      try{
        axios.post('http://localhost:5000/Login/SuccesLogin',{
            id:id
             });
             return true;
      }
        catch(e){
            return false;
        }
    }

    const loginBtnClick = async () =>{
        if(id.length === 0){
            alert("아이디를 입력해주세요.");
        }
        else if(pw.length === 0){
            alert("비밀번호를 입력해주세요.");
        }
       else if(!idValid || !pwValid){
            alert("아이디와 비밀번호를 제대로 입력해주세요.");
        }
        else{
            let respons = await axios.get('http://localhost:5000/Login/LoginSearchInfo',{
                params:{
                 'id': id
                } 
              });
              if(respons.data.data[0].id === id && respons.data.data[0].password === pw){
                
                if(changeLoginValue()){
                    dispatch(userinfo.actions.storeUserInfo({userID:id,userName:respons.data.data[0].name,userScore:0}));
                    navigate('/UserHome');
                }else{
                    alert('로그인 중 오류 발생');
                }
                
                
              }else{
                alert('아이디와 비밀번호가 회원 정보와 일치하지 않습니다.');
              }

        }
            

    }

    return (
        <div className='login-contents'>
            <img src={backgroundimg} className='login-backgroundimg'></img>
            <div className='login-wrap'>
                <div className='login-inner-wrap'>
                    <div className='logo-wrap'>
                        <img src={logoimg}  onClick={moveBackPage}></img>
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
                    <button className='login-button' onClick={loginBtnClick}>로그인</button>
                </div>

            </div>
        </div>
    )
}

export default Login;