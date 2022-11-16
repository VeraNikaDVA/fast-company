import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./layouts/users.jsx";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login.jsx";
import Main from "./layouts/main.jsx";
import Edit from "./layouts/edit.jsx";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/users/:userId?/edit" component={Edit}/>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/users/:userId?" component={Users}/>
                <Route path="/" component={Main}/>
            </Switch>
        </div>
    );
};

export default App;
