import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import './Home2.css';
import rogoImage from './image/rogo.jpg';
import rogoBlackImage from './image/rogo2.jpg';

import {throttle} from 'lodash';



const Home2:React.FC = () => {  
    
    const [bookOpen, setBookOpen] = useState<string>("diary front");
    const [bookChangeSize, setBookChangeSize] = useState<string>("diary-wrap");
    const [bookChangeColor, setBookChangeColor] = useState<string>("diary front back");
   const [contentSizeChange, setContentSizeChange] = useState<string>("diaryContent-wrap");
   const [textContentSizeChange, setTextContentSizeChange] = useState<string>("HomeText-wrap");




    const openBookhandle = () => 
    {
        setBookOpen("opendiary front");
        setBookChangeSize("opendiary-wrap");
        setBookChangeColor("opendiary front back");
        setContentSizeChange("opendiaryContent-wrap");
        setTextContentSizeChange("changeHomeText-wrap");
        
    }

    return(
       <div className='homeContent-wrap'>

        <div className={textContentSizeChange}>

        </div>

        <div className={contentSizeChange}>

        <div className={bookChangeSize}>
                    <div className='diary front back'></div>
                    <div className={bookOpen} onClick={openBookhandle}>
                        <strong>My Diary</strong>
                    </div>
                    <div className={bookChangeColor}></div>
                    <div className='diary bottom'></div>
                </div>
       </div>
        </div>

    );
}

export default Home2;