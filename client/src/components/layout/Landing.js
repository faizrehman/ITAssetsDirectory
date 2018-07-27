import React, { Component } from "react";

class Landing extends Component {
 
  render() {
    return (
        <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">IT Assets Directory
                </h1>
                <p className="lead">Manage/Track IT Assets like Laptops, Desktops, mobiles etc. using this portal</p>
                <hr />
                <a href="login.html" className="btn btn-lg btn-light">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
