import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './navbar.css';

export default class Navbar extends Component {
  render() {
    return (
        <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Collection</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/upload">Upload</a></li>
            <li><a href="/gallery">Gallery</a></li>  
          </ul>
        </div>
      </nav>
            
    );
  }
}
