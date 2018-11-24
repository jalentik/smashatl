import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import './CSS/App.css';
import logo from './Media/smashatl.png';
import logo2 from './Media/smashatl2.png';
import logo3 from './Media/logo2.gif';
import fb from './Media/fb.png';
import twit from './Media/twit.png';
import twtch from './Media/twitch.png';
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
import accountdetails from './Components/Account/AccountDetails/accountdetails.js'
import AppliedRoute from './Components/AppliedRoute.js'
import AccountSettings from './Components/Account/AccountDetails/accountdetails.js'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import ReactGA from 'react-ga';

const cookies = new Cookies();
var homeIco = require('./Media/home.png');
var userIco = require('./Media/user.svg');
var questionIco = require('./Media/question-mark.svg');
var mapIco = require('./Media/map.svg');
var calendarIco = require('./Media/calendar.svg');
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: cookies.get('isAuthenticated') || false,
      userDetails: cookies.get('userDetails') || {
        appuserid: -1,
        id: -1,
        tag: "",
        main: -1,
        secondary: -1,
        zipcode: -1,
        email: "",
        twitterurl: "",
        twitchurl: "",
        facebookurl: "",
        playstyle: -1,
        roles: ""
      }

    }
    this.clearUser = this.clearUser.bind(this)
  }
  setUserDetails = userDetails => {
    ReactGA.set({ userId: userDetails.appuserid });
    this.setState({ userDetails: userDetails })
    cookies.set('userDetails', userDetails, { path: '/' });

  }
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
    cookies.set('isAuthenticated', authenticated, { path: '/' })
  }
  clearUser() {
    cookies.remove('isAuthenticated');
    cookies.remove('userDetails');
    this.setState({ userDetails: {} });
  }
  render() {
    ReactGA.initialize('UA-129735914-1', {
      titleCase: false,
      gaOptions: {
        userId: this.state.userDetails.appuserid,
        name: this.state.userDetails.tag
      }
    });

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      userDetails: this.state.userDetails,
      setUserDetails: this.setUserDetails,
      clearUser: this.clearUser
    };
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <div id="app" className="app" >
              <BrowserView>
               <div>
                 SmashATL Desktop Coming Soon.
                 </div>
               {/*
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
                      <p>telephone: (770)313-6286</p>
                      <a href="">email: jalen.underwood@outlook.com</a>
                      <div style={{ display: 'flex', flexDirection: 'row', maxHeight: '50px', paddingTop: '10px' }}>
                        <img src={fb} className='social-image' />
                        <img src={twit} className='social-image' />
                        <img src={twtch} className='social-image' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content">

                  <div className="content-main" >
                    <TransitionGroup>
                      <CSSTransition in key={location.key} classNames="page-transition" timeout={500}>
                        <Switch location={location}>

                          <AppliedRoute path="/" exact component={home} props={childProps} />
                          <AppliedRoute exact path="/events" component={events} props={childProps} />
                          <AppliedRoute exact path="/smashmap" component={smashmap} props={childProps} />
                          <AppliedRoute exact path="/faq" component={faq} props={childProps} />
                          <AppliedRoute exact path="/account" component={account} props={childProps} />
                          <AppliedRoute exact path="/account/accountdetails" component={accountdetails} props={childProps} />
                          <AppliedRoute exact path="/account/accountdetails/accountsettings" component={AccountSettings} props={childProps} />

                          <Route render={() => <div>Not Found</div>} />

                        </Switch>
                      </CSSTransition>
                    </TransitionGroup>
                  </div>

                </div>
               */}
              </BrowserView>
              <MobileView>
                <div className="header" ref='header'>
                  <div className="header-left">
                  <div className="nav-container">
                      <img src={logo3} className="logo" />

                      <div className="nav-item">
                        <NavLink exact to="/">
                          <img alt="test" src={homeIco} />
                        </NavLink>
                      </div>
                      <div className="nav-item">
                        <NavLink to="/events">
                          <img src={calendarIco} />

                        </NavLink>

                      </div>

                      <div className="nav-item">
                        <NavLink to="/smashmap">
                          <img src={mapIco} />

                        </NavLink>
                      </div>
                      <div className="nav-item">
                        <NavLink to="/faq">
                          <img src={questionIco} />

                        </NavLink>
                      </div>
                      <div className="nav-item">
                        <NavLink to="/account">
                          <img src={userIco} />

                        </NavLink>
                      </div>
                    </div>

                    {/*} <div className="contact">
                    <p>telephone: (770)313-6286</p>
                    <a href="">email: jalen.underwood@outlook.com</a>
                    <div style={{ display: 'flex', flexDirection: 'row', maxHeight: '50px', paddingTop: '10px' }}>
                      <img src={fb} className='social-image' />
                      <img src={twit} className='social-image' />
                      <img src={twtch} className='social-image' />
                    </div>
          </div>*/}
                  </div>
                </div>

                <div className="content">

                  <div className="content-main" >
                    <TransitionGroup>
                      <CSSTransition in key={location.key} classNames="page-transition" timeout={500}>
                        <Switch location={location}>

                          <AppliedRoute path="/" exact component={home} props={childProps} />
                          <AppliedRoute  path="/events" component={events} props={childProps} />
                          <AppliedRoute  path="/smashmap" component={smashmap} props={childProps} />
                          <AppliedRoute  path="/faq" component={faq} props={childProps} />
                          <AppliedRoute exact path="/account" component={account} props={childProps} />
                          <AppliedRoute exact path="/account/accountdetails" component={accountdetails} props={childProps} />
                          <AppliedRoute exact path="/account/accountdetails/accountsettings" component={AccountSettings} props={childProps} />

                          <AppliedRoute render={() => <div>Not Found</div>} />

                        </Switch>
                      </CSSTransition>
                    </TransitionGroup>
                  </div>

                </div>
              </MobileView>

            </div>

          )}
        />

      </BrowserRouter>

    )
  }
}

export default App;
