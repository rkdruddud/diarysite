import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home2 from './Home2';
import Login from './LoginPages/Login';
import Register from './LoginPages/Register';
import FindID from './LoginPages/FindID';
import FindPW from './LoginPages/FindPW';

import {BrowserRouter, Routes, Route} from 'react-router-dom'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home2/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/FindID' element={<FindID/>}/>
      <Route path='/FindPW' element={<FindPW/>}/>
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

