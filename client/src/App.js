
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Add component references
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from './components/layout/Landing';
import Login from "./components/authentication/Login";

import './App.css';

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
          </div>    
          <Footer/>  
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
