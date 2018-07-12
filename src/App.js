import React, { Component } from 'react';
import './CSS/App.css';
import logo from './Media/smashatl.png';
import logo2 from './Media/smashatl2.png';
import logo3 from './Media/logo2.gif';
import fb from './Media/fb.png';
import twit from './Media/twit.png';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  Route,
  NavLink,
  Switch,
  BrowserRouter,
  withRouter
} from "react-router-dom";
import home from './Components/Home/home';
import events from './Components/Events/events';
import smashmap from './Components/SmashMap/smashmap';
import account from './Components/Account/account';
import faq from './Components/Faq/faq';


const App = () => (
  <BrowserRouter>
    <Route
      render={({ location }) => (
        <div id="app" className="app" >
                  <div className="header" ref='header'>
                    <div className="header-left">
                      <div className="nav-container">

                        <label className="nav-item">
                          <NavLink exact to="/">Home</NavLink>
                        </label>
                        <div className="nav-item">
                          <NavLink to="/events">Events</NavLink>

                        </div>
                        <div className="nav-item">
                          <NavLink to="/smashmap">Smash Map</NavLink>
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
                          <NavLink to="/account">Account</NavLink>
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
              
              <div className="content-main" >
                <TransitionGroup>
                  <CSSTransition in key={location.key} classNames="page-transition" timeout={500}>
                    <Switch location={location}>

                      <Route exact path="/" component={home} />
                      <Route exact path="/events" component={events} />
                      <Route exact path="/smashmap" component={smashmap} />
                      <Route exact path="/faq" component={faq} />
                      <Route exact path="/account" component={account} />

                      <Route render={() => <div>Not Found</div>} />

                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </div>

            </div>
        </div>

      )}
    />
  </BrowserRouter>

);

export default App;
