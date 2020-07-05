import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login  from './features/Login';
import Repositories  from './features/Repositories';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route exact path="/">
                  {<Login />}
              </Route>

              <Route exact path="/repositories">
                  {<Repositories />}
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
