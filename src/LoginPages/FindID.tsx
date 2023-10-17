import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import './FindID.css';


const FindID:React.FC =()=>{

    const [nameInfo, setNameInfo] = useState<string>('');
    const [phonNumberInfo, setPhonNumberInfo] = useState<string>('');

    const [phonNumberValid, setPhonNumberValid] = useState<boolean>(false);
    const [findIdInfo, setFindIdInfo] = useState<string>('hiddenIdInfo-wrap');
    const [changeBtn, setChangeBtn] = useState<string>('findId-btn-wrap');
    const [showSecondBtn, setShowSecondBtn] = useState<string>("hidden-findIdBtn-wrap");

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


    const clickFindId = () =>{
        setFindIdInfo('showIdInfo-wrap');
        setChangeBtn('hidden-findIdBtn-wrap');
        setShowSecondBtn('findId-secondBtn-wrap');
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
                   <input type="text" className='findID-input name' placeholder='이름을 입력해주세요.'></input>
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
                         <div className='findId-idInfoText'>아이디 : 니 아이디</div>
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