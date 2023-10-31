import {createStore} from 'redux';
import {configureStore, createSlice} from '@reduxjs/toolkit';
/*
const reducer = (state:string = "", action:any )=>{
    state = action.type;
    return state;
}
const store = createStore(reducer);
*/
let userinfo = createSlice({
    name:"userinfo",
    initialState:{
        userID:'',
        userName:'',
        userScore:0
    },
    reducers:{
        storeUserInfo: (state, action)=>{
            state.userID = action.payload.userID;
            state.userName = action.payload.userName;
            state.userScore = action.payload.userScore;
        },
    },
});

export default userinfo;
