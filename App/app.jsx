import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './Auth/auth.jsx';
import Registration from './Auth/registration.jsx';
import Header from './header/header.jsx';
import Projects from './Private/Projects.jsx';
import Route from './AuthRoute.jsx';
import Pub from './Auth/publicroot.jsx';
import Main from './Private/Main.jsx';

export default () => 
    <Router>      
        <div>             
            <Route path="/auth" component={Auth} />
            <Route path="/registration" component={Registration} />     
            <Route path="/main" component={Main} />
            <Route path="/main/proj" component={Projects} />
        </div>
    </Router>;