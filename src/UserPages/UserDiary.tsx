import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import logo from '../image/logo2.jpg';
import './UserDiary.css';
import { Value } from '../Types/calendar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Types/config';
import userinfo from '../Reducer/store';
import dateinfo from '../Reducer/dateStrore';
import axios from "axios";

const UserDiary = () =>{
    
    const dispatch = useDispatch();
    const userName = useSelector<RootState,string>((state)=>state.storeUserInfo.userName);
    const userID = useSelector<RootState,string>((state)=>state.storeUserInfo.userID);
    const userScore = useSelector<RootState,number>((state)=>state.storeUserInfo.userScore);
    const diaryDate = useSelector<RootState,string>((state)=>state.storeDateInfo.date);
    const diaryText = useSelector<RootState,string>((state)=>state.storeDateInfo.text);
    const navigate = useNavigate();

    const [readOnly,setReadOnly] = useState<boolean>(true);
    const [text, setText] = useState<string>('');
    const [updateBtnValue, setUpdateBtnValue] = useState<string>('수정');
    const [textCount, setTextCount] = useState<number>(0);
    const [hiddenTextCount, setHiddenTextCount] = useState<string>('hiddenTextCount-wrap');

    useEffect(()=>{
        setText(diaryText);
         setTextCount(diaryText.length);
    },[]);

    const updateHandle =()=>{
        if(updateBtnValue === '수정'){
            setReadOnly(false);
            setHiddenTextCount('textCout-wrap');
            setUpdateBtnValue('완료');
           
        }
        else{
            setReadOnly(true);
            setHiddenTextCount('hiddenTextCount-wrap');
            setUpdateBtnValue('수정');
        }
        
    }

    const moveBackPage = () =>{
        navigate(-1);
    }

    const textareaUpdateHandle = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setText(e.target.value);
        setTextCount(e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length);
        console.log()
    }



    return(
        <div className='userDiary-contents'>
        <div className='userDiary-wrap'>
            <div className='diary-date-wrap'>
                <div className='diary-date'>{diaryDate}</div>
            </div>
            <div className='diaryInfo-wrap'>

            <div className='diaryImg-wrap'>
                
                <div className='goHomeBtn-wrap'  onClick={moveBackPage}>
                <img className='home-logo' src={logo}></img>
                <p>돌아가기</p>
                </div>
                
                <div className='diaryImg-inner'>

                </div>
            </div>
            <div className='diaryText-wrap'>
                <div className='diaryText-inner'>
                <textarea className='diaryText' maxLength={1666} data-maxbyte={1666} readOnly={readOnly} value={text} onChange={textareaUpdateHandle}> </textarea>
                <p className={hiddenTextCount}>
                    <span>{textCount} </span>
                    <span>/ 5000자</span>
                </p>
                </div>
                 <div className='updateBtn-wrap'>
               
                    <div className='button-wrap'>
                    <button className='diaryBtn update' onClick={updateHandle}>{updateBtnValue}</button>
                    </div>
                    
                    
                </div>
            </div>

            </div>
           
        </div>
        </div>
    )
}

export default UserDiary;