import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import backgroundimg from '../image/backgroundimg.jpg';
import './Register.css';

const Register:React.FC =()=>{
    return (
        <div className='register-contents'>
             <img src={backgroundimg} className='register-backgroundimg'></img>
            <div className='register-wrap'>
                <div className='register-inner-wrap'>
                    
                </div>

            </div>
        </div>
    )
}

export default Register;