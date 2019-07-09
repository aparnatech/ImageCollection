import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/navbar';
import upload from './components/upload';
import Gallery from './components/gallery';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="">
        <Navbar />
        <Route exact path="/" component={upload} />
        <Route exact path="/gallery" component={Gallery} />
      </div>
    </Router>
    );
  }
}

export default App;
