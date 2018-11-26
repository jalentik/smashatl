import React, { Component } from "react";
import gamap from '../../Media/gamap.png';
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import './home.css'
import { TransitionGroup, CSSTransition } from "react-transition-group";

class home extends Component {
    constructor(props){
        super(props);
        this.state={
            showAnnouncements: false
        }
        this.toggleAnnouncements = this.toggleAnnouncements.bind(this);
    }
    componentDidMount() {
        document.title = "SmashATL";
    }
    toggleAnnouncements(){
       this.setState({showAnnouncements: !this.state.showAnnouncements})
    }
    render() {
        const showAnnouncements = this.state.showAnnouncements;
        return (
            <div className="content-home">
                <img src={gamap} className="ga-img" />
                <div className="home-text"  >
                    <h1>Welcome to Smash Atlanta.</h1>
                    <h2>Your premier source for finding players and tournaments near you.</h2>
                </div>
                <a className="join-now-link rainbow" onClick={() => this.props.history.push('/account')}>Join Now!</a>
                <a className="view-announcements-link" style={{textDecoration: "underline"}} onClick={this.toggleAnnouncements}><h2>View Announcements</h2></a>
                <CSSTransition in={showAnnouncements} classNames="announcements-modal" unmountOnExit timeout={500}>
                <div className="announcements-container">
                    <h3 style={{ textAlign: "center" }}>Announcements</h3>
                    <ul className="announcements-list" style={{ listStyle: "none", padding: "10px", margin: 0, fontFamily: 'Quicksand, sans-serif', fontSize: '15px' }}>
                        <li>
                            We welcome everyone to our Smash ATL open alpha.
                            Right now there is limited functionality as we prepare awesome new features to
                            provide our players and TO's with. For any feedback or concerns, feel free to contact
                            Miles Ifie or Jalen Underwood on the Georgia Smash Facebook page.
                            Thank you for reading and we look forward to the release of Ultimate.
                        </li>
                        <li>
                            <h4>Alpha Patch 1.02 - 11.26.18</h4>
                            <ul style={{ listStyle: "none", padding: "10px", margin: 0, fontFamily: 'Quicksand, sans-serif' }}>
                                <li>
                                    <strong>Events</strong>
                                    <ul style={{ listStyle: "circle", padding: "10px", margin: 0, fontFamily: 'Quicksand, sans-serif' }}>
                                    <li>
                                      Events slider working, awaiting content from Miles.
                                        </li>
                                        <li>
                                            <strong>Event Manager in testing</strong>. This goal of this feature is to streamline the event planning and creating process by utilizing
                                            reusable venue and event templates. After creation, the text can be converted to raw text for use in displaying on other websites (or here, once
                                            available). While you
                                            may only see the events slide images for now, there is a lot of data behind the scenes that will be revealed as more progress is made.
                                            </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>General</strong>
                                    <ul style={{ listStyle: "circle", padding: "10px", margin: 0, fontFamily: 'Quicksand, sans-serif' }}>
                                        <li>
                                            Fixed 404 route issue
                                        </li>
                                        <li>
                                            Many other small technical issues that would take longer to document than the time it took to resolve them.
                                        </li>
                                        <li>
                                            Fixed Incineroar pretending to be ZSS on dropdown/select boxes.
                                            </li>
                                    </ul>
                                </li>
                            </ul>

                        </li>
                        <li>
                            <h4>Alpha Patch 1.01 - 11.24.18</h4>
                            <ul style={{ listStyle: "none", padding: "10px", margin: 0, fontFamily: 'Quicksand, sans-serif' }}>
                                <li>
                                    <strong>General</strong>
                                    <ul style={{ listStyle: "circle", padding: "10px", margin: 0, fontFamily: 'Quicksand, sans-serif' }}>
                                    <li>
                                      Added new characters that were missing from the character select.
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </li>
                        <li>
                            <h4>Alpha Patch 1 - 11.24.18</h4>
                            <ul style={{ listStyle: "none", padding: "10px", margin: 0, fontFamily: 'Quicksand, sans-serif' }}>
                                <li>
                                    <strong>Smash Map</strong>
                                    <ul style={{ listStyle: "circle", padding: "10px", margin: 0, fontFamily: 'Quicksand, sans-serif' }}>
                                        <li>
                                            Optimized API calls for map data. - If you were experiencing issues viewing other players on the Map, this fixes your issue.
                            </li>
                                        <li>
                                            Added loading animation for getting map data.
                            </li>
                                        <li>
                                            Added refresh pull-bar at the top. Note: Generating map data is on demand if you have visited once before and not cleared your cache.
                            </li>

                                    </ul>
                                </li>

                                <li><strong>Account</strong>
                                    <ul style={{ listStyle: "circle", padding: "10px", margin: 0, fontFamily: 'Quicksand, sans-serif' }}>
                                        <li>Changed social network link fields to social network name only. Originally intended for people to provide their own links, however I do see major flaws in this design and do not feel like accomodating all of them.</li>
                                        <li>With the change to the social network fields, I've emptied them all for you in advance. Thank you for your understanding.</li>
                                    </ul>
                                </li>
                            </ul>

                        </li>

                    </ul>
                    <a onClick={this.toggleAnnouncements} className="hide-announcements-link"><h3><i className="fa fa-times"></i>   Hide</h3></a>
                </div>
                </CSSTransition>


            </div>

        )
    }
}

export default home;    