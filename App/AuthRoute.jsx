﻿import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const cookies = new Cookies();
const isAuthenticated = () => {
    if (cookies.get('ID') != null) {
        console.log("tyc tyc tyc")
        return true;
    }
    else {
        console.log("tyc tyc tyc22")
        return false;
    }
};
setTimeout(isAuthenticated, 5000);
const PRIVATE_ROOT = '/main';
const PUBLIC_ROOT = '/auth';

const AuthRoute = ({ component, ...props }) => {
    const { isPrivate } = component;
    if (isAuthenticated()) {
        //User is Authenticated
        if (isPrivate === true) {
            //If the route is private the user may proceed.
            return <Route { ...props } component={component} />;
        }
        else {
            //If the route is public, the user is redirected to the app's private root.
            return <Redirect to={PRIVATE_ROOT} />;
        }
    }
    else {
        //User is not Authenticated
        if (isPrivate === true) {
            //If the route is private the user is redirected to the app's public root.
            return <Redirect to={PUBLIC_ROOT} />;
        }
        else {
            //If the route is public, the user may proceed.
            return <Route { ...props } component={component} />;
        }
    }
};

AuthRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ])
};

export default AuthRoute;