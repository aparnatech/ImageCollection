import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div className="container valign-wrapper heigth_of_div">
        <div className="row">
          <div className="col s12 center-align">
            <br />
            <div className="col s6">
              <Link
                to="/upload"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3 upload btn-style">
               Upload
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/gallery"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3 upload btn-style">
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}