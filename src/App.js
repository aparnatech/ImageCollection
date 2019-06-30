import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navbar from './components/navbar'
import upload from './components/upload'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar/>
        <Route path="/upload/images" exact component={upload}/>
      </Router>
      
    );
  }
}

export default App;
