import {createStore} from 'redux';
import {configureStore, createSlice} from '@reduxjs/toolkit';

let dateinfo = createSlice({
    name:"dateinfo",
    initialState:{
        date:'',
        text:'',
    },
    reducers:{
        storeDateInfo: (state, action)=>{
            state.date = action.payload.date;
            state.text = action.payload.text;
            
        },
    },
});

export default dateinfo;