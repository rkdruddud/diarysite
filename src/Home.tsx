import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import './Home.css';
import rogoImage from './image/rogo.jpg';
import rogoBlackImage from './image/rogo2.jpg';
import window1 from './image/window.jpg';
import {throttle} from 'lodash';



const Home:React.FC = () => {  
    const [boxWidth, setBoxWidth] = useState<number>(0);
    const [boxHeight, setBoxHeight] = useState<number>(0);
    const [boxleft, setBoxleft] = useState<number>(0);
    const [boxtop, setBoxtop] = useState<number>(0);
   
    const handleResize = throttle(()=>{
        
        let currentWidth : number = 1109;
        let currentHeight : number = 648;
    
        let currnetRatio : number = currentWidth/currentHeight;
    
        let windowHeight : number = window.innerHeight;
        let windowWidth : number = window.innerWidth;
        let windowRatio : number = windowWidth/windowHeight;
            
        
        let top : number = (currentHeight-windowHeight)/2;
       
    
        if(windowRatio>currnetRatio){   //넓이 기준
          setBoxHeight((windowWidth/currnetRatio)-600);
          setBoxWidth(windowWidth);
          setBoxleft(0);
          setBoxtop((windowHeight - windowWidth/currnetRatio)/2);
          
    
        }
    
        if(windowRatio<currnetRatio){   //높이 기준
          setBoxHeight(windowHeight-600);
          setBoxWidth(windowHeight*currnetRatio);
          setBoxleft((windowHeight * currnetRatio - windowWidth)/2);
          setBoxtop(0);
        }
    }, 200);
   
    useEffect(()=>{

        window.addEventListener("resize",handleResize);
       
      },[])

    return(
        <div className='HomeContents'>
            <img className='backgroundIMG' src={window1} style={{
                height:boxHeight,
                width:boxWidth,
                left:boxleft,
                top:boxtop
            }}></img>
            <div className='menu-wrap'>
                <div className='Rogo-wrap'>
                <img src={rogoBlackImage}></img>
                <h1>DiafyQuest</h1>
                </div>

                <div className='nav-wrap'>
                    <nav className='nav-inner'>
                            <div className='horizentalbar'></div>                       
                            <ul className='nav-menu'>
                                <li className='nav-item'>
                                    <h2 className='nav-links'>
                                        My Diary
                                    </h2>
                                </li>
                                <li className='nav-item'>
                                    <h2 className='nav-links'>
                                        Create Diary
                                    </h2>
                                </li>

                                <li className='nav-item'>
                                    <h2 className='nav-links'>
                                        Sign In
                                    </h2>
                                </li>
                            </ul>
                     
                    </nav>
                </div>
            </div>


            <div className='contents-wrap'>
                <div className='table-content'>
                <div className='table-wrap'>
                <div className='table-bord'></div>
                <div className='table-leg'></div>
                </div>
                
               

                
                
                <div className='diary-wrap'>
                    <div className='diary front back'></div>
                    <div className='diary front'>
                        <strong>My Diary</strong>
                    </div>
                    <div className='diary diary-content'></div>
                    <div className='diary bottom'></div>
                </div>
                </div>
            </div>



        </div>
    );
}

export default Home;