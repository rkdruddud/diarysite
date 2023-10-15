import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import './FindID.css';


const FindID:React.FC =()=>{
    return (
        <div className='findID-contents'>
             <img src={backgroundimg} className='findID-backgroundimg'></img>
            <div className='findID-wrap'>
                <div className='findID-inner-wrap'>
                    <div >
                    <input type='text' className='findID-input name' placeholder='이름을 입력해주세요.'></input>
                 <input type='text' className='findID-input phonNumber' placeholder='핸드폰 번호를 입력해주세요.'></input>
                    </div>
                 
                </div>

            </div>
        </div>
    )
}

export default FindID;