import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import './Home2.css';
import rogoImage from './image/rogo.jpg';
import rogoBlackImage from './image/rogo2.jpg';
import booksImage from './image/books.jpg';
import {throttle} from 'lodash';



const Home2:React.FC = () => {  
    
    const [bookOpen, setBookOpen] = useState<string>("diary front");
    const [bookChangeSize, setBookChangeSize] = useState<string>("diary-wrap");
    const [bookChangeColor, setBookChangeColor] = useState<string>("diary front back");
 const [changeRightSlide, setChangeRightSlide] = useState<string>("right-side");
  const [changeLeftSlide, setChangeLeftSlide] = useState<string>("left-side");
  const [changeLeftTrackSlide, setChangeLeftTrackSlide] = useState<string>("slider-track-stop");
  const [changeRightTrackSlide, setChangeRightTrackSlide] = useState<string>("slider-track-stop");
  const [doorSizeValid, setDoorSizeValid] = useState<string>("doorContent-wrap");
//  const [hiddenLeftBar,setHiddenLeftBar] = useState<string>("left-bar");
//  const [hiddenRightBar,setHiddenRightBar] = useState<string>("right-bar");

    const openBookhandle = () => 
    {
        setBookOpen("opendiary front");
        setBookChangeSize("opendiary-wrap");
        setBookChangeColor("opendiary front back");
        setChangeRightSlide("right-side-slider");
        setChangeLeftSlide("left-side-slider");
        setChangeLeftTrackSlide("slider-track-left");
        setChangeRightTrackSlide("slider-track-right");
        setDoorSizeValid("sizeUp-doorContent-wrap")
       // setHiddenLeftBar("hidden-bar");
       // setHiddenRightBar("hidden-bar");
        
    }

    return(
       <div className='homeContent-wrap'>

        <div className="HomeText-wrap"> 
      
            <div className={changeLeftSlide}>
            <div className={changeLeftTrackSlide}>
                <div className='slide'><img  src={booksImage}></img></div>
                <div className='slide'><img  src={booksImage}></img></div>
                <div className='slide'><img  src={booksImage}></img></div>
                <div className='slide'><img  src={booksImage}></img></div>
            </div>
        
            </div>
      
            <div className={changeRightSlide}>
            
            <div className={changeRightTrackSlide}>
                <div className='slide'><img  src={booksImage}></img></div>
                <div className='slide'><img  src={booksImage}></img></div>
                <div className='slide'><img  src={booksImage}></img></div>
                <div className='slide'><img  src={booksImage}></img></div>
            </div>
        
            </div>
        

            <div className='door-wrap'>
       <div className={doorSizeValid}>
            <div className='leftdoor'></div>
            <div className='rightdoor'></div>
        </div>

       </div> 

        <div className='diaryContent-wrap'>
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

        <div className='floorContent-wrap'></div>
       
        
        
       </div>



    );
}

export default Home2;