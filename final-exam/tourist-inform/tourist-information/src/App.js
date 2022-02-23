import db from './firebase/db'; // eslint-disable-line no-unused-vars
// ↑↑↑ A FENTI SOR(OKA)T NE MÓDOSÍTSD ↑↑↑
import './App.scss';
import React from "react";
import Attractions from "./Attractions";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Attractions />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
