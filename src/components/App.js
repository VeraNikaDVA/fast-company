import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "../layouts/users.jsx";
import NavBar from "./navBar.jsx";
import Login from "../layouts/login.jsx";
import Main from "../layouts/main.jsx";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId?" component={Users}/>
                <Route path="/" component={Main}/>
            </Switch>
        </div>
    );
};

export default App;
