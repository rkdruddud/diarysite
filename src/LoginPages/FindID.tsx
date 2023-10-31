import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import './FindID.css';
import axios from 'axios';


const FindID:React.FC =()=>{

    const [nameInfo, setNameInfo] = useState<string>('');
    const [phonNumberInfo, setPhonNumberInfo] = useState<string>('');

    const [phonNumberValid, setPhonNumberValid] = useState<boolean>(false);
    const [findIdInfo, setFindIdInfo] = useState<string>('hiddenIdInfo-wrap');
    const [changeBtn, setChangeBtn] = useState<string>('findId-btn-wrap');
    const [showSecondBtn, setShowSecondBtn] = useState<string>("hidden-findIdBtn-wrap");

    const [showID , setShowID] = useState<string>("");

    const navigate = useNavigate();

    const phonNumberHandle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setPhonNumberInfo(e.target.value);

        const regex = /^01([0|1|6|7|8|0])-?([0-9]{3,4})-?([0-9]{4})$/;

        if(regex.test(phonNumberInfo)){
            setPhonNumberValid(true);
        }else {
            setPhonNumberValid(false);
        }
    }

    const nameHandle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setNameInfo(e.target.value);
    }

    const clickFindId = async () =>{
        

        if(nameInfo.length === 0){
            alert('이름을 올바르게 입력해주세요.');
        }
        else if(phonNumberInfo.length === 0 || !phonNumberValid){
            alert('핸드폰 번호를 올바르게 입력해주세요.');
        }
        else {
            try{
                let respons = await axios.get('http://localhost:5000/FindID/findID',{
                    params: {
                        'name' : nameInfo,
                        'phonNumber' : phonNumberInfo
                    }
                 });
                 console.log(respons);
                 if(respons.data.data[0].id.length){
                    setFindIdInfo('showIdInfo-wrap');
                    setChangeBtn('hidden-findIdBtn-wrap');
                    setShowSecondBtn('findId-secondBtn-wrap');
                    setShowID(respons.data.data[0].id);
                 }else{
                    alert('등록된 ID가 없습니다.');
                 }
            }
            catch(e){
                alert('오류로 인한 조회 실패');
            }
        }
        
        
    }

    const clickMoveBackPage = () =>{
        navigate(-1);
    }

    return (
        <div className='findID-contents'>
             <img src={backgroundimg} className='findID-backgroundimg'></img>
            <div className='findID-wrap'>
                <div className='findID-inner-wrap'>
                  
                    <div className='findID-input-wrap'>
                   <h1>아이디 찾기</h1>
                   <div className='findIDinfo name'>
                   <input type="text" className='findID-input name' value={nameInfo} onChange={nameHandle} placeholder='이름을 입력해주세요.'></input>
                   </div>
                    
                    <div className='findIDinfo phonNumber'>
                    <input type="tel" className='findID-input phonNumber' value={phonNumberInfo} onChange={phonNumberHandle} placeholder='핸드폰 번호를 입력해주세요.'></input>
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

                    <div className={findIdInfo}>
                         <div className='findId-idInfoText'>아이디 : {showID}</div>
                    </div>
                            
                     <div className={changeBtn}>
                    <button className='findIdBtn confirm' onClick={clickFindId}>확인</button>
                    <button className='findIdBtn cancle' onClick={clickMoveBackPage}>취소</button>
                    </div>    

                    <div className={showSecondBtn}>
                        <button className='findIdBtn-second confirm' onClick={clickMoveBackPage}>확인</button>
                        </div>   
                </div>

            </div>
        </div>
        </div>
    )
}

export default FindID;