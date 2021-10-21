import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.css';

import Dashboard from "./routes/Dashboard";
import ErrorPage from "./routes/ErrorPage";

// routes
import PrivateRoute from "./routes/helpers/PrivateRoute";
import PublicRoute from "./routes/helpers/PublicRoute";
import LoginPage from "./routes/LoginPage";

function App() {


    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" render={() => <Redirect to="/login"/>} exact/>
                    <PublicRoute restricted={true} path="/login" component={LoginPage} exact/>
                    <PrivateRoute restricted path="/dashboard" component={Dashboard} exact/>
                    <PublicRoute path="*" component={ErrorPage} exact/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
