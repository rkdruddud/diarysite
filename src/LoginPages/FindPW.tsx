import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import './FindPW.css';

const FindPW:React.FC =()=>{
    return (
        <div className='findPW-contents'>
             <img src={backgroundimg} className='findPW-backgroundimg'></img>
            <div className='findPW-wrap'>
                <div className='findPW-inner-wrap'>
                    
                </div>

            </div>
        </div>
    )
}

export default FindPW;