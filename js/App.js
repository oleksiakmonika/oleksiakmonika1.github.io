import React from "react";
import ReactDOM from "react-dom";
import Home from './Home/Home';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Notes from './Nav/Notes';
import NotFound from "./Nav/NotFound";

require('../scss/main.scss');

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/note" component={Notes}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </div>
    );
}
ReactDOM.render(<App/>, document.getElementById("app"));

