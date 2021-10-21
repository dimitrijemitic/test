import React, { useEffect, useMemo, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import LoginService from "../../api/LoginService";
import { UserProvider } from "../../contexts/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuth = LoginService.checkLoggedUserToken();
    const history = useHistory();

    const [ user, setUser ] = useState(null);
    const value = useMemo(() => ({ user, setUser }), [ user, setUser ]);

    useEffect(() => {
        if (isAuth) {
            // get user
            LoginService.getUser().then(responseData => {
                // store user
                setUser(responseData.data);
            }).catch(error => {
                setUser(null);
                history.push('/');
                console.log(error);
            });
        }
    }, [ isAuth ]);

    return (
        <Route {...rest} render={props => isAuth ?
            <UserProvider value={value}>
                <Component {...props} />
            </UserProvider>
            :
            <Redirect to="/"/>
        }/>
    );
};

export default PrivateRoute;
