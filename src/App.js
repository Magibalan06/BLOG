import "./App.css";
import { Provider } from 'react-redux';
import store from './Redux/store';
import React from "react";
import 'antd/dist/antd.css';
import './components/Screen1/CssFile.css';
import './components/Screen2/CssFile02.css';
import './components/Screen3/CssFile03.css';
import Combine from "./components/Screen1/Combine";
import Combine02 from "./components/Screen2/Combine02";
import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Screen3/Layout";
import { NoMatch } from "./components/noMatch";
import Auth from "./components/Auth";
import Profile from './components/Screen3/Profile';
import Dashboard from './components/Screen3/Dashboard';
import Posts from './components/Screen3/Posts';
import Blog from './components/Screen3/Blog';

function App() {
  return( 
    <Provider store = {store}>
  <div className="App">
   
      
        <Routes>
          <Route path='/' element = { <Combine/> } />
          <Route path='/signup' element = { <Combine02/> } />
          <Route path='/login' element = { 
            <Auth > <Layout/> </Auth>} >
              <Route index element= { <Posts/> } />
              <Route path='profile' element={ <Profile/> }/>
              <Route path='posts' element={ <Posts/>}></Route>
              <Route path='dashboard' element={ <Dashboard/> }/>
            </Route>
            <Route path="login/posts/:id" element= { <Blog/> }/>
          <Route path= '*' element= { <NoMatch/>}/>
        </Routes>   


</div>
</Provider>
)
  
}

export default App;
