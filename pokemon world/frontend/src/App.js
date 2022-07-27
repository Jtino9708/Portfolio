import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.slim.min.js'
import 'popper.js/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import memberHomePage from "./component/memberSystem/memberHomePage.jsx"
import login from "./component/memberSystem/login.jsx"
import register from "./component/memberSystem/register.jsx"
import newPassword from './component/memberSystem/newPassword.jsx';
import sendMail from './component/memberSystem/sendMail.jsx';
import activeMail from './component/memberSystem/activeMail.jsx';

import homePage from "./component/homePage/homePage.jsx"
import dexPage from "./component/homePage/dexPage.jsx"
import singleDexPage from "./component/homePage/singleDexPage.jsx"

import littleGame from "./component/littleGame/App.jsx"

import startpage from './component/mainGame/startpage';
import battlepage from './component/mainGame/battlepage';
import winpage from './component/mainGame/winpage';
import losepage from './component/mainGame/losepage';


import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

class App extends Component {
  state = {  } 
  render() { 
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/" component={homePage} exact/>
            <Route path="/homePage" component={homePage} exact/>
            <Route path="/dexPage" component={dexPage} exact/>
            <Route path="/singleDexPage/:dexIDselect" component={singleDexPage} exact/>

            <Route path="/login" component={login} exact/>
            <Route path="/register" component={register} exact/>
            <Route path="/activeMail/:mail" component={activeMail} />
            <Route path="/sendMail" component={sendMail} exact/>
            <Route path="/newPassword/:mail" component={newPassword} />
            <Route path="/member" component={memberHomePage}/>

            <Route path="/littleGame" component={littleGame} />

            <Route path="/start" component={startpage} exact />
            <Route path="/battle" component={battlepage} exact />
            <Route path="/youwin" component={winpage} exact />
            <Route path="/youlose" component={losepage} exact />
          </Switch>
      </BrowserRouter>

    );
  }
}
 
export default App;
