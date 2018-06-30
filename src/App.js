import React, { Component } from 'react';
import './App.css';
import logo from './smashatl.png';
import logo2 from './smashatl2.png';
import logo3 from './logo2.gif';
import fb from './fb.png';
import twit from './twit.png';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import home from './home';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <div className="header">
            <div className="header-left">
              <div className="nav-container">

                <label className="nav-item nav-active">
                  <NavLink to="/">Home</NavLink>
                </label>
                <div className="nav-item">
                  <NavLink to="/events">Events</NavLink>

                </div>
                <div className="nav-item">
                  <NavLink to="/smap">Smash Map</NavLink>
                </div>
              </div>
            </div>
            <div className="header-middle">

              <img src={logo3} className="logo" />
            </div>
            <div className="header-right">

              <div className="nav-container">

                <div className="nav-item">
                  <NavLink to="/faq"> FAQ</NavLink>
                </div>
                <div className="nav-item">
                  <NavLink to="/acc">Account</NavLink>
                </div>

              </div>
              <div className="contact">
                <p>telephone: (770)111-1111</p>
                <a href="">email: team@smashatl.com</a>
                <div style={{ display: 'flex', flexDirection: 'row', maxHeight: '50px', paddingTop: '10px' }}>
                  <img src={fb} className='social-image' />
                  <img src={twit} className='social-image' />
                </div>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="content-side"></div>
            <div className="content-main" >
              <Route exact path="/" component={home} />

            </div>
            <div className="content-side"></div>

          </div>

        </div>

      </HashRouter>

    );
  }
}

export default App;
