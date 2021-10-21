import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import LoginService from "../../api/LoginService";

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
    const isAuth = LoginService.checkLoggedUserToken();
    return (
        <Route {...rest} render={props => isAuth && restricted ? <Redirect to="/dashboard"/> : <Component {...props} />}/>
    );
};

export default PublicRoute;
