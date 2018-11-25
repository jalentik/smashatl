import React, { Component } from "react";
import ReactGA from 'react-ga';
import './events.css';
import statesRepo from '../States';
import { TransitionGroup, CSSTransition } from "react-transition-group";

class event extends Component {
    constructor(props){
    super(props);
    this.getEvents = this.getEvents.bind(this);
    this.postEvent = this.getEvents.bind(this);
    this.putEvent = this.getEvents.bind(this);
    this.deleteEvent = this.getEvents.bind(this);
    //this.editEvent = this.editEvent.bind(this);
    this.state = {
        events: [], currentEvent: {}
    }
    }
    componentDidMount(){
        ReactGA.pageview('/events/eventmanager');
    }
    getEvents(){
        fetch("http://smashatlapi-prod.us-east-2.elasticbeanstalk.com/api/events/getevents/" + this.props.appuserid, {
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
    postEvent(){
        fetch("http://smashatlapi-prod.us-east-2.elasticbeanstalk.com/api/events/postevent/", {
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
    putEvent(){
        fetch("http://smashatlapi-prod.us-east-2.elasticbeanstalk.com/api/events/getevents/", {
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
    deleteEvent(){
        fetch("http://smashatlapi-prod.us-east-2.elasticbeanstalk.com/api/events/getevents/", {
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
    editEvent(e, event){
      console.log(event);
    }
render(){
    const events = this.state.events;

  return(

      <div className="event-manager-container">
    <div onClick={this.toggleShow}  className="modal-background">
    <div className="modal new-event-modal">
    <h1>Event Manager</h1>
    
    <div className="event-man-list">
    <TransitionGroup>
     {events.map(event =>{ return(
                      <CSSTransition in key={event.EventId} classNames="event-transition" timeout={500} unmountOnExit>
                      <div className="event-item">
                       <div className="event-name">
                       <h4>{event.Name}</h4>
                       </div>
                       <div className="event-actions">
                         <a onClick={this.editEvent.bind(this, event)}><i className="fa fa-pencil fa-2x"></i></a>
                         <a onClick={this.deleteEvent.bind(this, event)}><i className="fa fa-trash fa-2x"></i> </a>
                       </div>
                      </div>
</CSSTransition>

       
     )})}  
     </TransitionGroup>
     </div>
          </div>
          </div>
          </div>
  )
}
}