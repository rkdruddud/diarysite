import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import logo from '../image/logo2.jpg';
import './SimpleUserDiary.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Types/config';
import userinfo from '../Reducer/store';
import dateinfo from '../Reducer/dateStrore';
import axios from "axios";

import AWS from 'aws-sdk';

const SimpleUserDiary:React.FC = () => {

    const dispatch = useDispatch();
    const userName = useSelector<RootState,string>((state)=>state.storeUserInfo.userName);
    const userID = useSelector<RootState,string>((state)=>state.storeUserInfo.userID);
    const userScore = useSelector<RootState,number>((state)=>state.storeUserInfo.userScore);

    return (
        <div className='SimpleUserDiary-content'>
            <div className='SimpleUserDiary-wrap'>
                <div className='SimpleDiary-wrap'>
                    <div className='SimpleDiary-menu-wrap'>

                    </div>
                    <div className='SimpleDiary-inner'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimpleUserDiary;