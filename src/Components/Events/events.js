import React, { Component } from "react";
import NewEvent from './NewEvent'
import './events.css'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import ReactGA from 'react-ga';
import EventManager from './EventManager';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
var bnb = require('../../Media/bnb.jpg');


class event extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [], showNewEvent: false, showEventManager: false, selectedEventIndex: 0 }
        this.refreshEvents = this.refreshEvents.bind(this);
        this.toggleShowNewEvent = this.toggleShowNewEvent.bind(this);
        this.newEventHandler = this.newEventHandler.bind(this);
        this.toggleShowEventManager = this.toggleShowEventManager.bind(this);
    }
    componentDidMount() {
        document.title = "Events";
        this.refreshEvents();
    }
    toggleShowEventManager() {
        this.setState({ showEventManager: !this.state.showEventManager })
    }
    toggleShowNewEvent() {
        this.setState({ showNewEvent: !this.state.showNewEvent })
    }
    newEventHandler() {
        this.toggleShowNewEvent();
        this.refreshEvents();
    }
    refreshEvents() {
        fetch("http://smashatlapi-prod.us-east-2.elasticbeanstalk.com/api/events/getevents", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then(results => {
                if (!results.ok) { this.toggleHasError(); throw new Error("Something went wrong.") }
                else {
                    return results.json();
                }
            }).then(data => {
                this.setState({ events: data })
            })
    }
    onClickThumb(e) {
    }
    onClickItem(e) {
        console.log(e)


    }
    onCarouselChange(e) {
    }
    render() {
        const showNewEvent = this.state.showNewEvent;
        const showEventManager = this.state.showEventManager;
        const events = this.state.events;
        var settings = {
            dots: true,
            className: "events-slider"
          };
        let newEventButton;
        let eventManagerButton
        if (this.props.userDetails) {
            if (this.props.isAuthenticated) {
                if (this.props.userDetails.roles) {
                    if (this.props.userDetails.roles.indexOf("App.Administrator") > 0 || this.props.userDetails.roles.indexOf("App.Owner") > 0) {
                        newEventButton = <a className="new-event-btn" onClick={this.toggleShowNewEvent}><i className="fa fa-plus"></i>  New Event</a>
                        eventManagerButton = <a className="event-man-btn" onClick={this.toggleShowEventManager}><i className="fa fa-tasks"></i>  Manage</a> 
                    }
                }
            }
        }
        const selectedEventIndex = this.state.selectedEventIndex;
        const listItems = events.map((item, i) =>
            <div className="image-item" key={item.Url}>
             <a href={item.Url}>
                <img src={item.LogoUrl} />
                <p></p>
                </a>
            </div>
        );
        return (

            <div className="events-content">
            <CSSTransition
                    in={showEventManager}
                    timeout={300}
                    classNames="new-event-window"
                    unmountOnExit

                    onExited={() => {
                    }}
                >
                    {state => (
                     <EventManager appuserid={this.props.userDetails.appuserid} toggleHandler={this.toggleShowEventManager}/>
                    )
                    }
                </CSSTransition>
                <CSSTransition
                    in={showNewEvent}
                    timeout={300}
                    classNames="new-event-window"
                    unmountOnExit

                    onExited={() => {
                    }}
                >
                    {state => (
                        <NewEvent postSubmitHandler={this.newEventHandler} activeUserId={this.props.userDetails.appuserid} />
                    )
                    }
                </CSSTransition>
                <h1>Upcoming Events</h1>
                <h4>Swipe left and right to view events.</h4>
                <h4>Tap the event for more details.</h4>
                <Slider {...settings}> 
                {listItems}
                    
                </Slider>
                <MobileView>
                    {newEventButton}
                    {eventManagerButton}
                </MobileView>
            </div>

        )
    }
}

export default event;