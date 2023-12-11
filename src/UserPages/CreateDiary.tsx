import  React, { InputHTMLAttributes, useEffect, useState,useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import galleryImg from '../image/gallery.jpg';
import logo from '../image/logo2.jpg';
import './CreateDiary.css';
import { Value } from '../Types/calendar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Types/config';
import userinfo from '../Reducer/store';
import dateinfo from '../Reducer/dateStrore';
import axios from "axios";

import AWS from "aws-sdk";

  
const CreateDiary:React.FC = () =>{
    

    const dispatch = useDispatch();
    const userName = useSelector<RootState,string>((state)=>state.storeUserInfo.userName);
    const userID = useSelector<RootState,string>((state)=>state.storeUserInfo.userID);
    const userScore = useSelector<RootState,number>((state)=>state.storeUserInfo.userScore);
    const diaryDate = useSelector<RootState,string>((state)=>state.storeDateInfo.date);
    
    const imgRef = useRef();
    const navigate = useNavigate();

    const [imgBaseURL, setImgBaseURL] = useState<string>("");
    const [changeImgText, setChangeImgText] = useState<string>("이미지 추가");
    const [preshowImgValid, setPreshowImgValid] = useState<string>("hidden-preshowimg")
    const [imgURL, setImgURL] = useState<File | null>(null);
    const [text, setText] = useState<string>('');
    const [textCount, setTextCount] = useState<number>(0);
    const [imageKey, setImageKey] = useState<string>("");

    const formData = new FormData();

    /** 이미지 파일인지 확인 */
    const isImage = (file: File) => {
        return file.type.startsWith('image/');
      };

      /** 업로드할 파일 확인후 업로드 */
    const uploadImgFile = async () =>{

        if (!imgURL || !diaryDate || !userID) {
            console.error('파일 업로드 실패');
            return;
        }

        if (!isImage(imgURL)) {
            console.error('업로드된 파일이 이미지가 아닙니다.');
            return;
        }
 
         try {
               buketUpload(formData);
             } catch (error) {
                console.error('Error uploading file:', error);
             }
    }

/**s3 버킷에 이미지 업로드 함수 */
    const buketUpload = (formData:any) =>{
      const REGION = process.env.REACT_APP_REGION;
      const ACCESS_KEY_ID= process.env.REACT_APP_ACCESS_KEY_ID;
      const SECRET_ACCESS_KEY_ID = process.env.REACT_APP_SECRET_ACCESS_KEY_ID;
    
    AWS.config.update({
      region:REGION,
      accessKeyId:ACCESS_KEY_ID,
      secretAccessKey:SECRET_ACCESS_KEY_ID,
    })
    
    if(imgURL !== null){
        
        const upload = new AWS.S3.ManagedUpload({
            params: {
                ACL: 'public-read',
                Bucket: 'diaryqeststore',
                Key: `${userID}/${imageKey}`,
                Body: imgURL,
                
            }

        });
        try{
            
            upload.promise();
            console.log("버킷에 업로드 됨");        
        }catch(e){
            console.log(e);
        }
        
    }
    
    }


    /** 일기 생성버튼 클릭 이벤트 함수*/
    const createHandle = ()=>{
            console.log(userID);
           
            if(userID === ""){
                alert("로그 아웃 되었습니다. 다시 로그인 해주세요.");
                navigate(-2);
            }else{
                
                try{
                    if(imgURL !== null){
                        uploadImgFile();
                    
                  axios.post('http://localhost:5000/UserHome/creatediary',{
                        id:userID,
                        text:text,
                        date:diaryDate,
                        score:userScore+1,
                        image:imageKey
                         });
                         alert("저장 완료");
                         navigate(-1);
                        }
                         else{
                            alert("업로드 실패");
                        }
                }
                catch(e){
                    alert(e);
                }
            }
        
        
    }

    const moveBackPage = () =>{
        navigate(-1);
    }

    const textareaUpdateHandle = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setText(e.target.value);
        setTextCount(e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length);
    }

    /** 업로드 이미지 미리보기 기능 제공 */
    const uploadImgShowHandle = async (e:React.ChangeEvent<HTMLInputElement>) =>{
      
        let reader = new FileReader();
      
        const files = e.target.files;
        if(files && files.length === 1){

            const file = files[0];

            reader.onloadend = () =>{

                const base64 = reader.result;
                if (base64) {
                    setImgBaseURL(base64.toString()); // 파일 base64 상태 업데이트
                    setPreshowImgValid('preshowImg');
                    setChangeImgText("이미지 변경");
                }
           }
             if(files !== null){
                reader.readAsDataURL(file);
                
                formData.append('file',file);
                formData.append('name',userID+diaryDate+file.name);
                
                setImageKey(userID+diaryDate+file.name);
                setImgURL(file);
               
            }
        }
        



    }


    return(
       

       
        <div className='createDiary-contents'>
            <div className='creatDiary-wrap'>
            <div className='createDiary-title-wrap'>
                <div className='createDiary-title'>Create diary</div>
            </div>
            <div className='createDiaryInfo-wrap'>

            <div className='createDiaryImg-wrap'>

            <div className='createDiary-date-wrap'>
                <div className='createDiary-date'>{diaryDate}</div>
            </div>
            
                <div className='createDiaryImg-inner'> 
              
                <form className='fileUploadImg-wrap' encType="multipart/form-data">
                <img className={preshowImgValid} src={imgBaseURL}></img>
                <input type="file" id="file" multiple={false} accept='image/*'  onChange={uploadImgShowHandle} style={{display:"none"}}></input>
            
                <label className="fileLable" htmlFor="file" >
                    <div className='fileLable-inner'>
                    <img src={galleryImg}></img>
                    <div className='ImgText'>{changeImgText}</div>
                    </div>
                    
                </label>

                </form>
                </div>

                <div className='goHomeBtn-wrap'  onClick={moveBackPage}>
                <img className='home-logo' src={logo}></img>
                <p>돌아가기</p>
                </div>

            </div>
            <div className='createDiaryText-wrap'>
                <div className='createDiaryText-inner'>
                <textarea className='createDiaryText' maxLength={1666} data-maxbyte={1666} value={text} onChange={textareaUpdateHandle}> </textarea>
                <p className="textCout-wrap">
                    <span>{textCount} </span>
                    <span>/ 5000자</span>
                </p>
                </div>
                 <div className='createDiaryBtn-wrap'>
                    <div className='createbutton-wrap'>
                    <button className='createDiaryBtn' onClick={createHandle}>저장</button>
                    </div>
                    
                    
                </div>
            </div>

            </div>
            </div>
         
        </div>
        
    )
}

export default CreateDiary;
