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

import AWS from 'aws-sdk';

const UserDiary:React.FC = () =>{
    
    
    
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
    const [hiddenBtn, setHiddenBtn] = useState<string>('diaryBtn delete');
   
    const [diaryImg, setDiaryImg] = useState<string>("");

    const [s3ImageName, setS3ImageName] = useState<string>("");
   
    const S3 = new AWS.S3();
    

    useEffect(()=>{
        setText(diaryText);
         setTextCount(diaryText.length);
         serchDiaryImageFile();
        
       
    },[]);

    /** S3 버킷에서 해당 날짜 이미지 불러오는 함수 */
    const loadImageFile = async (diayImgFileName:string) =>{
       
       try{
            const response = await S3.getObject({
                Bucket : "diaryqeststore",
                Key:`${userID}/${diayImgFileName}`,
            }).promise();
          
          if(response.Body !== undefined){
            const blob = new Blob([response.Body as BlobPart]);
            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(blob);
            setDiaryImg(imageUrl);  
            return;
        }
        }
        catch(e){
            console.log(e);
        }
    }

    /** S3 버킷의 이미지 객체 삭제 함수 */
    const deleteImageFileS3 = async () =>{
        try{
            const response = await S3.deleteObject({
                Bucket : "diaryqeststore",
                Key:`${userID}/${s3ImageName}`,
            }).promise();
        }
        
        catch(e){
            console.log(e);
        }
    }

    /** 일기 사진 DB에서 조회 함수 */
    const serchDiaryImageFile = async() => {
       
        try{
           console.log("asdfadfadsfadf");
           
            let respons = await axios.get('http://localhost:5000/UserHome/diaryImageFileSearch',{
                params: {
                  'id' : userID,
                  'date': diaryDate
                }      
                  });
                  setS3ImageName(respons.data.data[0].image);
                  loadImageFile(respons.data.data[0].image);
        }
        catch(e){
            console.log(e);
            alert("이미지 파일이 없습니다."); // 이미지가 없는 경우엔 빈칸으로 띄워주는 코드 작성해야함.
            return;
        }
    }

    /** 일기 업데이트 함수 */
    const updateHandle =()=>{
        if(updateBtnValue === '수정'){
            setReadOnly(false);
            setHiddenTextCount('textCout-wrap');
            setHiddenBtn('hiddenBtn');
            setUpdateBtnValue('완료');
        }
        else{
            setReadOnly(true);
            setHiddenTextCount('hiddenTextCount-wrap');
            setHiddenBtn('diaryBtn delete');
            setUpdateBtnValue('수정');
            
        if(window.confirm("수정한 내용을 저장하시겠습니까?")){
            axios.post('http://localhost:5000/UserHome/diaryUpdateText',{
                id:userID,
                text:text,
                date:diaryDate
                 });

            alert("저장완료");
            moveBackPage();
        }
        else {
            alert("취소");
        }    
        }
        
    }

    /**콜백함수 써주기. 수정사항. */
    const moveBackPage = () =>{
        navigate(-1);
    }

    const textareaUpdateHandle = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setText(e.target.value);
        setTextCount(e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length);
        
    }

    /** 일기 삭제 함수 */
    const deleteHandle = () =>{
       
        if(window.confirm("정말 삭제하시겠습니까?")){
            try{
                axios.post('http://localhost:5000/UserHome/deletediary',{
                    id:userID,
                    date:diaryDate
                });

                deleteImageFileS3();
                
                alert("삭제되었습니다.");
                navigate(-1);
                }
                catch(e){
                    alert(e);
                }
        }

        else {
             alert("취소되었습니다.");
        }       
    }


    return(
        <div className='userDiary-contents'>
        <div className='userDiary-wrap'>
            <div className='diary-title-wrap'>
                <div className='diary-title'>My diary</div>
            </div>
            <div className='diaryInfo-wrap'>

            <div className='diaryImg-wrap'>
                
            <div className='diary-date-wrap'>
                <div className='diary-date'>{diaryDate}</div>
            </div>
             
                
                <div className='diaryImg-inner'>
                    <img src={diaryImg}></img>
                </div>

                <div className='goHomeBtn-wrap'  onClick={moveBackPage}>
                <img className='home-logo' src={logo}></img>
                <p>돌아가기</p>
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
                    <button className={hiddenBtn} onClick={deleteHandle}>삭제</button>
                    </div>
                    
                    
                </div>
            </div>

            </div>
           
        </div>
        </div>
    )
}

export default UserDiary;