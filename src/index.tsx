import React from 'react';
import ReactDOM from 'react-dom/client';
import Home2 from './Home2';
import Login from './LoginPages/Login';
import Register from './LoginPages/Register';
import FindID from './LoginPages/FindID';
import FindPW from './LoginPages/FindPW';
import ChangePW from './LoginPages/ChangePW';
import UserHome from './UserPages/UserHome';
import UserDiary from './UserPages/UserDiary';
import CreateDiary from './UserPages/CreateDiary';
import SimpleUserDiary from './UserPages/SimpleUserDiary';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from './Types/config';
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path='/' element={<Home2/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/FindID' element={<FindID/>}/>
      <Route path='/FindPW' element={<FindPW/>}/>
      <Route path='/ChangePW' element={<ChangePW/>}/>
      <Route path='/UserHome' element={<UserHome/>}/>
      <Route path='/SimpleUserDiary' element={<SimpleUserDiary/>}/>
      <Route path='/UserDiary' element={<UserDiary/>}/>
      <Route path='/CreateDiary' element={<CreateDiary/>}/>
    </Routes>
    </QueryClientProvider>
    </Provider>
   
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

