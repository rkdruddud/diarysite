import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import './App.css';
import contentImage from './image/contentimg.jpg';
import rogoImage from './image/rogo.jpg';
import rogoBlackImage from './image/rogo2.jpg';



const App:React.FC = () => {
 
/**다이어리*/
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


  const [boxWidth, setBoxWidth] = useState<number>(0);
  const [boxHeight, setBoxHeight] = useState<number>(0);
  const [boxleft, setBoxleft] = useState<number>(0);

  useEffect(()=>{

    let currentWidth : number = 1626;
    let currentHeight : number = 1080;

    let currnetRatio : number = currentWidth/currentHeight;

    let windowHeight : number = window.innerHeight;
    let windowWidth : number = window.innerWidth;
    let windowRatio : number = windowWidth/windowHeight;
        
    let windowSize : number = ((windowHeight+windowWidth)/2);
    let currentSize : number = ((currentHeight+currentWidth)/2);
    let top : number = (currentHeight-windowHeight)/2;
    

    if(windowRatio>currnetRatio){   //넓이 기준
      setBoxHeight(currentHeight/currnetRatio);
      setBoxWidth(currentWidth);
      setBoxleft((currentSize-windowSize)/2);

    }

    if(windowRatio<currnetRatio){   //높이 기준
      setBoxHeight(currentHeight);
      setBoxWidth(windowWidth*currnetRatio);
      setBoxleft((windowSize-currentSize)/2);
    }


  },[])

  return (
    
    <div className='HomePage'> 
      <div className='head-wrap'>
        <div className='RogoBlack-wrap'>
            <img src={rogoBlackImage}></img>
            <p>DiaryQuest</p>
        </div>
      </div>

    <div className='content-wrap'>
      <img className='contentImg' src={contentImage}></img>
      <div className={bookChangeSize}>
                    <div className='diary front back'></div>
                    <div className={bookOpen} onClick={openBookhandle}>
                        <strong>My Diary</strong>
                    </div>
                    <div className={bookChangeColor}></div>
                    <div className='diary bottom'></div>
                </div>
      <div className='content-inner'>
        <h1>
           매일 일기쓰기 도전
        </h1>
        <p>
        도전을 통해 포인트를 쌓고 일기 작성을 즐겨봐요.<br/>
        그날의 사진과 함께 일기를 작성하면 더욱 기억에 남아요.
        </p>
      </div>
    </div>
   
    <section className='reward-wrap'>
      <div className='new-reward-inner'>
    
      <div className='Rogo-wrap'>
        <img className='Rogo' src={rogoImage}></img>
      </div>

      
     <div className='reward-info-wrap'>
    <div className='reward-group'>
    <div className='info-wrap'>
        <h2>
      DiaryQuest에서 제공하는 서비스를 확인해봐요.
      </h2>
      <p>
        DiaryQuest 회원이세요? 로그인을 통해 일기를 작성해보세요.<br/>
            DiaryQuest 회원이 아니세요? 회원가입을 통해 서비스를 사용해보세요.
      </p>
        </div>

       <div className='SignUp-register-Wrap'>
          <input className='SignUpBtn' type='button' value="로그인"></input>
          <input className='RegisterBtn' type='button' value="회원가입"></input>
      </div>

      </div>

     </div>
    </div>
    

    
      
    </section>
   
    </div>
    
  );
}

export default App;
/* height:boxHeight,
      width:boxWidth,
      left:boxleft,
      backgroundColor:"rgb(255, 217, 0)"
      src="https://cdn2.chrono24.com/images/uhren/30208540-mib7joa5rno55yl9vrod1w46-Square330.jpg"
      src="https://cdn2.chrono24.com/cdn-cgi/image/f=auto,metadata=none,q=65,h=305/images/topmodels/74-984eorvfjxmx240c0i4zlfhx-Original.png"
       


    <img className='noteImg' src={noteImage}></img>
    <img className='travelImg' src={travelImage}></img>
    <img className='calendarImg' src={calendarImage}></img> 
    <img className='clockImg' src={clockImage}></img>
    <div className='firtstImg'>



      */

    /*
  const autoSizeChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    let tagId : string = e.target.id;
    let box : HTMLElement = document.getElementById(tagId) as HTMLElement;
    let currentWidth : number = box.getBoundingClientRect().width;
    let currentHeight : number = box.getBoundingClientRect().height;

    let currnetRatio : number = currentWidth/currentHeight;

    let windowHeight : number = window.innerHeight;
    let windowWidth : number = window.innerWidth;
    let windowRatio : number = windowWidth/windowHeight;
        
    let windowSize : number = ((windowHeight+windowWidth)/2);
    let currentSize : number = ((currentHeight+currentWidth)/2);
    let top : number = (currentHeight-windowHeight)/2;
    

    if(windowRatio>currnetRatio){   //넓이 기준
      setBoxHeight(currentHeight/currnetRatio);
      setBoxWidth(currentWidth);
      setBoxleft((currentSize-windowSize)/2);

    }

    if(windowRatio<currnetRatio){   //높이 기준
      setBoxHeight(currentHeight);
      setBoxWidth(windowWidth*currnetRatio);
      setBoxleft((windowSize-currentSize)/2);
    }

    
  }


const autoSizeChange = () =>{
  let currentWidth : number = parseInt($(".box").css("width"));
  let currentHeight : number =parseInt($(".box").css("height"));

  let currnetRatio : number = currentWidth/currentHeight;

  let windowHeight : number = window.innerHeight;
  let windowWidth : number = window.innerWidth;
  let windowRatio : number = windowWidth/windowHeight;
      
  let windowSize : number = ((windowHeight+windowWidth)/2);
  let currentSize : number = ((currentHeight+currentWidth)/2);
  let top : number = (currentHeight-windowHeight)/2;
  

  if(windowRatio>currnetRatio){   //넓이 기준
    setBoxHeight(currentHeight/currnetRatio);
    setBoxWidth(currentWidth);
    setBoxleft((currentSize-windowSize)/2);

  }

  if(windowRatio<currnetRatio){   //높이 기준
    setBoxHeight(currentHeight);
    setBoxWidth(windowWidth*currnetRatio);
    setBoxleft((windowSize-currentSize)/2);
  }

  
}
*/