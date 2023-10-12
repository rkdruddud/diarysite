import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import './Home2.css';
import rogoImage from './image/rogo.jpg';
import rogoBlackImage from './image/rogo2.jpg';
import booksImage from './image/books.jpg';
import travel from './image/travel.jpg';
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
  const [visibleText1, setVisibleText1] = useState<string>("text-contents-wrap");
  const [visibleText2, setVisibleText2] = useState<string>("hidden-text-wrap");
//  const [hiddenLeftBar,setHiddenLeftBar] = useState<string>("left-bar");
//  const [hiddenRightBar,setHiddenRightBar] = useState<string>("right-bar");

/** 책 클릭 */
    const openBookhandle = () => 
    {
        setBookOpen("opendiary front");
        setBookChangeSize("opendiary-wrap");
        setBookChangeColor("opendiary front back");
        setChangeRightSlide("right-side-slider");
        setChangeLeftSlide("left-side-slider");
        setChangeLeftTrackSlide("slider-track-left");
        setChangeRightTrackSlide("slider-track-right");
        setDoorSizeValid("sizeUp-doorContent-wrap");
        setVisibleText1("hidden-text-wrap");
        setVisibleText2("second-text-contents-wrap");
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
            <div className='leftdoor'>
                <div className='door-handle'></div>
            </div>
            <div className='rightdoor'>
            <div className='door-handle'></div>
            </div>
         </div>
       
            <div className={visibleText1}>
                <div className='background-blind-wrap'></div>
                <div className='title-text-wrap'>
                    DiaryQest에 오신것을 환영합니다.
                </div>
                <div className='text-wrap'>
                        하루동안 있었던 일들을 기록해보아요.<br/>
                        매일 일기 작성으로 포인트를 적립해요.
                    </div>
            </div>

            <div className={visibleText2}>
                <div className='background-blind-wrap'></div>
                <div className='second-title-text-wrap'>
                  사진과 함께 하루를 기록해요.
                </div>
                <div className='second-text-wrap'>
                        그날을 대표하는 사진을 넣고<br/>
                        하루동안 있었던 일을 기록할 수 있어요.
                    </div>
            </div>
        

       </div> 

        <div className='diaryContent-wrap'>
        <div className={bookChangeSize}>
        <div className='diarytext'>click here</div>
            <strong className='inner-text'>
            Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical 
Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Ham
pden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
 source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" The Extrem
 es of Good and Evil by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very po
 pular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a 
 line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1
.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact origin
al form, accompanied by English versions from the 1914 translation by H. Rackham.
            </strong>
                    <div className='diary front back'></div>
                    <div className={bookOpen} onClick={openBookhandle}>
                        <img src={travel}></img>
                        
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