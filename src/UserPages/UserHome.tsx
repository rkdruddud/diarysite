import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './UserHome.css';
import { Value } from '../Types/calendar';
import './Calendar.css';
import axios from "axios";
import Calendar from 'react-calendar';
import { format } from 'path';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { size } from 'lodash';
import { transcode } from 'buffer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Types/config';
import userinfo from '../Reducer/store';
import dateinfo from '../Reducer/dateStrore';
import moment from 'moment';
import { click } from '@testing-library/user-event/dist/click';
import { useQuery } from 'react-query';


interface MarkDate {
    date : string;
}

const UserHome:React.FC = ()=>{
    const [value, onChange] = useState<Value|any|string>(new Date());

    const [showUserInfo, setShowUserInfo] = useState<string>("hidden-wrap");
    const [clickDate, setClickDate] = useState<string>("");
    const [markDate, setMarkDate] = useState<MarkDate[]>([]);

    const dispatch = useDispatch();
    const userName = useSelector<RootState,string>((state)=>state.storeUserInfo.userName);
    const userID = useSelector<RootState,string>((state)=>state.storeUserInfo.userID);
    const userScore = useSelector<RootState,number>((state)=>state.storeUserInfo.userScore);
    const navigate = useNavigate();

    useEffect(()=>{
       // getWrittenDiaryDate();
        
       
    },[]);

    const {data} = useQuery(
        ["id",userID]
        ,async() => {
            const result = await axios.get('http://localhost:5000/UserHome/getWrittenDiaryDate',{
                params: {
                  'id' : userID
                }      
                  });
                  console.log(result.data.data);
                  return result.data.data;
        },
        {
            onSuccess(data:any){
                setMarkDate(data);
            }
        }
        
    );

   /* const getWrittenDiaryDate = async() => {
        try{
           
            let respons = await axios.get('http://localhost:5000/UserHome/getWrittenDiaryDate',{
                params: {
                  'id' : userID
                }      
                  });
                  setMarkDate(respons.data.data);

        }
        catch(e){
           console.log("가져오기 실패");
        }
    }
*/
    function dayjs(date: Date) {
        throw new Error('Function not implemented.');
    }

    const clickIconHandle = () =>{
       
        if(showUserInfo === "hidden-wrap"){
            setShowUserInfo("userInfo-wrap");
            console.log(markDate);
        }
        else {
            setShowUserInfo("hidden-wrap");
        }
        
    }

    const onChangeDayHandle=async(selectDate:Value|any)=>{
        onChange(selectDate);
        setClickDate(moment(selectDate).format("YYYY년 MM월 DD일"));
       const date = moment(selectDate).format("YYYY년 MM월 DD일");
       
        try{
           
            let respons = await axios.get('http://localhost:5000/UserHome/diaryexistence',{
                params: {
                  'id' : userID,
                  'date': date
                }      
                  });
                  console.log(respons.data.data[0].date);
                  if(respons.data.data[0].date === date){
                            
                    dispatch(dateinfo.actions.storeDateInfo({date:date, text:respons.data.data[0].text}));
                    navigate('/UserDiary');  
                }
             

        }
        catch(e){
            dispatch(dateinfo.actions.storeDateInfo({date:date}));
            navigate('/CreateDiary');
        }
    }

    const onClickDay = async () =>{
      
        
    }


    const onClickLogout = () =>{
        try{
            axios.post('http://localhost:5000/Login/SuccesLogout',{
                id:userID
                 });
                 
                dispatch(userinfo.actions.storeUserInfo({userID:"", userName:"", userScore:0}));
                navigate(-2);
          }
            catch(e){
                alert(e);
            }

    }

    const onClickShowAllDiary = () =>{
        navigate('/SimpleUserDiary');  
    }

    return(
        <div className='userHome-contents'>
            <div className='userHome-wrap'>

            <div className='userHome-inner-wrap'>
                <div className='userHome-inner-wrap title'>
                    <div className='userHome-titleWrap'>
                        <h1>Login Home Page</h1>
                    </div>
                    
                </div>

                <div className='userHome-inner-wrap calendarWrap'>
                    <div className='userHome-inner'>
                        <div className='calendar-wrap'>
                            <Calendar className='calendar'
                             formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                             calendarType='gregory' 
                             onChange={onChangeDayHandle}
                             value={value}
                             onClickDay={onClickDay} 
                             tileContent={({date, view})=>{
                              let html = [];
                                if(markDate.find((element) => element.date === moment(date).format("YYYY년 MM월 DD일"))){
                                    html.push(<div className='mark'></div>);
                                }
                                    return(
                                            <>
                                            <div className='flex justify-center items-center absoluteDiv'>
                                            {html}
                                            </div>
                                            </>
                                    )
                                
                             }}></Calendar>

                        </div>
                    </div>
                    
                </div>
               
            </div>
            <div className='userIcon-wrap'>
            <FontAwesomeIcon icon={faUser} size='2x' style={{
                    position: "absolute",
                    border:"5px solid #fff",
                    borderRadius:"100px",
                    padding:"8px",
                    marginTop:"6px",
                    marginLeft:"8px",
                    cursor:"pointer",
                    color: "#ffffff",}} onClick={clickIconHandle}/>

            </div>
            
            <div className={showUserInfo}>
                            <div className='userInfo-inner name'>
                                <div className='userInfo'>{userName}</div>
                            
                            </div>

                            <div className='userInfo-inner point'>
                                <div className='userInfo'>score : {userScore}</div>
                            </div>

                            <div className='userInfo-inner otherpage'>
                                <div className='showAllpage' onClick={onClickShowAllDiary}>일기 전체 보기</div>
                            </div>

                            <div className='userInfo-inner logout'>
                                <button className='logoutBtn' onClick={onClickLogout}>logout</button>
                            </div>

                        </div>

            </div>
            
        </div>
    )
}

export default UserHome;
