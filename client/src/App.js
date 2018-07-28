
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

// Add component references
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from './components/layout/Landing';
import Login from "./components/authentication/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/privateRoute";

import './App.css';


//Check for token
if (localStorage.jwtToken) {
  //Set token to Auth header
  setAuthToken(localStorage.jwtToken);

  //Decode token to get user data
  const decoded = jwt_decode(localStorage.jwtToken);

  //set current user
  store.dispatch(setCurrentUser(decoded));

}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar/>  
          <Route exact path="/" component={Landing} />
          <div className="container">
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/Dashboard" component={Dashboard} />
              </Switch>
          </div>    
          <Footer/>  
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
