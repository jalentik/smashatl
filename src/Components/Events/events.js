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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactGA from 'react-ga';

var bnb = require('../../Media/bnb.jpg');


class event extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [], showNewEvent: false, selectedEventIndex: 0 }
        this.refreshEvents = this.refreshEvents.bind(this);
        this.toggleShowNewEvent = this.toggleShowNewEvent.bind(this);
        this.newEventHandler = this.newEventHandler.bind(this);
    }
    componentDidMount() {
        ReactGA.pageview('/events');
        document.title = "Events";
        this.refreshEvents();
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
    onClickItem(e, f) {
        window.open(f.key, '_blank');

    }
    onCarouselChange(e) {
    }
    render() {
        const showNewEvent = this.state.showNewEvent;
        const events = this.state.events;
        let newEventButton;
        if (this.props.userDetails) {
            if (this.props.isAuthenticated) {
                if (this.props.userDetails.roles) {
                    if (this.props.userDetails.roles.indexOf("App.Administrator") > 0 || this.props.userDetails.roles.indexOf("App.Owner") > 0) {
                        newEventButton = <a className="new-event-btn" onClick={this.toggleShowNewEvent}><i className="fa fa-plus"></i>New Event</a>
                    }
                }
            }
        }
        const selectedEventIndex = this.state.selectedEventIndex;
        const listItems = this.state.events.map((item, i) =>
            <div key={item.Url}>
                <img src={item.LogoUrl} />
            </div>
        );
        return (

            <div className="events-content">
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
                <h3>Double tap the event for more details.</h3>
                <Carousel showArrows={true} onChange={this.onCarouselChange} selectedItem={selectedEventIndex} onClickItem={this.onClickItem} onClickThumb={this.onClickThumb}>
                    {listItems}
                </Carousel>
                <MobileView>
                    {newEventButton}
                    
                </MobileView>
            </div>

        )
    }
}

export default event;