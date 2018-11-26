import React, { Component } from "react";
import ReactGA from 'react-ga';
import './events.css';
import statesRepo from '../States';
import { TransitionGroup, CSSTransition } from "react-transition-group";
class EventEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { eventItem: { Date: Date.now(), Address: {} } }
        this.inputChange = this.inputChange.bind(this);
        this.addressInputChange = this.addressInputChange.bind(this);
        this.states = statesRepo.states;
    }
    inputChange(e) {
        const type = e.target.type;
        const value = e.target.value;
        const name = e.target.name;
        const checked = e.target.checked;
        var item = this.state.eventItem;
        switch (type) {
            case "text":
            case "date":
            case "number":
            case "time":
                item[name] = value;
                break;
            case "checkbox":
                item[name] = checked;
                break;
        }
        this.setState({ eventItem: item })

    }

    addressInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        var item = this.state.eventItem;
        item["Address"][name] = value;
        this.setState({ eventItem: item })

    }
    componentWillReceiveProps(props) {

    }
    componentDidMount() {
        this.setState({ eventItem: this.props.eventItem });
    }
    render() {
        const eventItem = this.state.eventItem;
        const stateItems = this.states.map((state) =>
            <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
        );
        return (
            <div className="event-editor-container">
                <div className="event-editor-details">
                    <h2> Edit Event </h2>
                    <div style={{ display: 'inline-block' }}><span style={{ color: 'red' }}>*</span>= required.</div>
                    <form onSubmit={() => this.props.submitHandler.bind(this, this.state.eventItem)}>
                        <h2>
                            Details
                             </h2>
                        <div className="form-items-container">
                            <p>Event URL<span style={{ color: 'red' }}>*</span></p>
                            <input name="Url" onChange={this.inputChange} value={eventItem['Url']} type="text" placeholder="http://facebook.com/events/..." />

                            <p>Event Name<span style={{ color: 'red' }}>*</span></p>
                            <input name="Name" onChange={this.inputChange} value={eventItem['Name']} type="text" placeholder="My Event Name" />

                            <p>Description</p>
                            <input name="Description" onChange={this.inputChange} value={eventItem['Description']} type="text" placeholder="Some details about my tournament" />
                            <div className="item-row-container">
                                <p>Event Start Date<span style={{ color: 'red' }}>*</span></p>
                                <input name="Date" onChange={this.inputChange} value={eventItem['Date']} type="date" />
                            </div>
                            <p>Logo Url</p>
                            <input name="LogoUrl" onChange={this.inputChange} value={eventItem['LogoUrl']} type="text" placeholder="http://myimagehost.com/myimage.png" />

                            <p>Venue Name<span style={{ color: 'red' }}>*</span></p>
                            <input name="VenueName" onChange={this.inputChange} value={eventItem['VenueName']} type="text" placeholder="Hosting venue's name" />


                            <div className="item-row-container">
                                <p>Venue Fee</p>
                                <input name="VenueFee" onChange={this.inputChange} value={eventItem['VenueFee']} type="number" placeholder="0.00" />
                            </div>
                            <div className="item-row-container">

                                <p>Venue Close Time</p>
                                <input name="VenueCloseTime" onChange={this.inputChange} value={eventItem['VenueCloseTime']} type="time" />
                            </div>
                            <div className="item-row-container">

                                <p>Singles?</p>
                                <input name="HasSingles" type="checkbox" onChange={this.inputChange} checked={eventItem['HasSingles']} />
                            </div>
                            <CSSTransition
                                in={eventItem['HasSingles']}
                                timeout={300}
                                classNames="form-items-window"
                                unmountOnExit

                                onExited={() => {
                                }}
                            >
                                {state => (
                                    <div>
                                        <div className="item-row-container">

                                            <p>Singles Start Time</p>
                                            <input name="SinglesStartTime" onChange={this.inputChange} value={eventItem['SinglesStartTime']} type="time" />
                                        </div>
                                        <div className="item-row-container">

                                            <p>Singles Fee</p>
                                            <input name="SinglesFee" onChange={this.inputChange} value={eventItem['SinglesFee']} type="number" step="0.01" placeholder="" />
                                        </div>
                                        <div className="item-row-container">

                                            <p>Max Singles Entrants</p>
                                            <input name="MaxSinglesCount" onChange={this.inputChange} value={eventItem['MaxSinglesCount']} type="number" placeholder="" />
                                        </div>
                                    </div>
                                )
                                }
                            </CSSTransition>


                            <div className="item-row-container">

                                <p>Doubles?</p>
                                <input name="HasDoubles" type="checkbox" onChange={this.inputChange} checked={eventItem['HasDoubles']} />
                            </div>
                            <CSSTransition
                                in={eventItem['HasDoubles']}
                                timeout={300}
                                classNames="form-items-window"
                                unmountOnExit

                                onExited={() => {
                                }}
                            >
                                {state => (
                                    <div>
                                        <div className="item-row-container">

                                            <p>Doubles Start Time</p>
                                            <input name="DoublesStartTime" onChange={this.inputChange} value={eventItem['DoublesStartTime']} type="time" />
                                        </div>
                                        <div className="item-row-container">
                                            <p>Doubles Fee</p>
                                            <input name="DoublesFee" onChange={this.inputChange} value={eventItem['DoublesFee']} step="0.01" type="number" placeholder="" />
                                        </div>
                                        <div className="item-row-container">

                                            <p>Max Doubles Entrants</p>
                                            <input name="MaxDoublesCount" onChange={this.inputChange} value={eventItem['MaxDoublesCount']} type="number" placeholder="" />
                                        </div>
                                    </div>
                                )
                                }
                            </CSSTransition>


                            <div className="item-row-container">

                                <p>Pot Bonus</p>
                                <input name="PotBonus" onChange={this.inputChange} value={eventItem['PotBonus']} type="number" placeholder="" />
                            </div>
                            <div className="item-row-container">

                                <p>Setup Discount?</p>
                                <input name="SetupDiscount" onChange={this.inputChange} checked={eventItem['HasSetupDiscount']} type="checkbox" placeholder="" />
                            </div>
                            <CSSTransition
                                in={eventItem["HasSetupDiscount"]}
                                timeout={300}
                                classNames="form-items-window"
                                unmountOnExit

                                onExited={() => {
                                }}
                            >
                                {state => (
                                    <div>
                                        <div className="item-row-container">

                                            <p>Discount Amount</p>
                                            <input name="DiscountAmount" onChange={this.inputChange} value={eventItem['SetupDiscount']} type="number" placeholder="" min="0.01" step="0.01" />
                                        </div>
                                        <div className="item-row-container">

                                            <p>Setup Discount Limit</p>
                                            <input name="SetupDiscountLimit" onChange={this.inputChange} value={eventItem['SetupDiscountLimit']} type="number" placeholder="" />
                                        </div>
                                    </div>
                                )
                                }
                            </CSSTransition>

                        </div>

                        <h2>
                            Location<span style={{ color: 'red' }}>*</span>
                        </h2>
                        <div className="form-items-container">
                            <p>Street Address</p>
                            <input name="Street1" onChange={this.addressInputChange} value={eventItem['Address']['Street1']} type="text" placeholder="42 Wallaby Way" />

                            <p>Suite/Unit/Apt #</p>
                            <input name="Street2" onChange={this.addressInputChange} value={eventItem['Address']['Street2']} type="text" placeholder="Suite 103" />

                            <p>City</p>
                            <input name="City" onChange={this.addressInputChange} value={eventItem['Address']['City']} type="text" placeholder="Sydney" />

                            <p>State</p>
                            <select name="State" onChange={this.addressInputChange} placeholder="Select State" value={eventItem['Address']['State']}>
                                {stateItems}
                            </select>

                            <p>Postal Code</p>
                            <input name="PostalCode" onChange={this.addressInputChange} value={eventItem['Address']['PostalCode']} type="text" placeholder="12345" />
                        </div>

                    </form>
                </div>
                <div className="event-editor-actions">
                    <input type="button" onClick={this.props.submitHandler.bind(this, this.state.eventItem)} value="Save Changes" />
                    <a onClick={this.props.cancelHandler}>Cancel</a>
                </div>
            </div>
        )
    }
}

class EventManager extends Component {
    constructor(props) {
        super(props);
        this.getEvents = this.getEvents.bind(this);
        this.putEvent = this.putEvent.bind(this);
        this.state = {
            events: [], currentEvent: {}, editingEvent: false,loading:false
        }
        this.deleteEvent = this.deleteEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.handleEditedEvent = this.handleEditedEvent.bind(this);
    }
    componentDidMount() {
        this.getEvents();
    }
    toggleLoading(){
     this.setState({loading: !this.state.loading})
    }
    getEvents() {
        this.toggleLoading();
        fetch("http://smashatlapi-prod.us-east-2.elasticbeanstalk.com/api/events/getevents?appuserid=" + this.props.appuserid, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then(results => {
                if (!results.ok) { throw new Error("Something went wrong.") }
                else {
                    return results.json();
                }
            }).then(data => {
                this.setState({ events: data }, ()=>this.toggleLoading())
            }).catch(err=> {this.toggleLoading(); console.log(err); alert('An error occurred. Please try again later.')})
    }

    putEvent(e) {
        fetch("http://smashatlapi-prod.us-east-2.elasticbeanstalk.com/api/events/putevent/" + e.EventId, {
            method: 'PUT',
            body: JSON.stringify(e),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then(results => {
                if (!results.ok) { console.log(results); throw new Error("Failed to save event, please try again later.") }
                else {
                    this.getEvents();
                }
            }).catch(err=> alert(err))
    }
    deleteEvent(e, event) {
        
        if (window.confirm("Are you sure you want to delete this event?")) {
            fetch("http://smashatlapi-prod.us-east-2.elasticbeanstalk.com/api/events/deleteevent/" + e.EventId, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(results => {
                    if (!results.ok) { throw new Error("Something went wrong.") }
                    else {
                        this.getEvents();
                    }
                })
                .catch(err=> alert('Failed to delete event, please try again later.'))
        }
    }
    editEvent(e, event) {
        this.setState({ currentEvent: e }, () => this.setState({ editingEvent: true }))

    }
    cancelEditing() {
        this.setState({ currentEvent: null }, () => this.setState({ editingEvent: false }));
    }
    handleEditedEvent(e, event) {
        this.putEvent(e);
        this.setState({ editingEvent: false })
    }
    render() {
        const events = this.state.events;
        const editingEvent = this.state.editingEvent;
        const currentEvent = this.state.currentEvent;
        const loading = this.state.loading;
        return (

            <div className="event-manager-container">
            <CSSTransition unmountOnExit mountOnEnter in={loading} timeout={1000} classNames="loading-transition">
            <div className="loading-spinner-container">
                    <i className="fa fa-spinner fa-spin fa-4x"></i>
                    <h4>Loading Events...</h4>
                    </div>
                </CSSTransition>
                <CSSTransition unmountOnExit in={editingEvent} timeout={300} classNames="loading-transition">
                    <EventEditor submitHandler={this.handleEditedEvent} cancelHandler={this.cancelEditing} eventItem={currentEvent} />
                </CSSTransition>
                <div className="modal-background">
                    <div className="modal new-event-modal">
                        <h1>Event Manager</h1>
                        <div className="event-man-list">
                            <TransitionGroup>
                                {events.map(event => {
                                    return (
                                        <CSSTransition in key={event.EventId} classNames="event-transition" timeout={500} unmountOnExit>
                                            <div className="event-item">
                                                <div className="event-name">
                                                    <h4>{event.Name}</h4>
                                                </div>
                                                <div className="event-actions">
                                                    <a onClick={this.editEvent.bind(this, event)}><i className="far fa-edit fa-2x"></i></a>
                                                    <a onClick={this.deleteEvent.bind(this, event)}><i className="fa fa-trash fa-2x"></i> </a>
                                                </div>
                                            </div>
                                        </CSSTransition>
                                    )
                                })}
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
                <a hidden={editingEvent} className="exit-manager-link" onClick={this.props.toggleHandler}><i className="fa fa-times fa-2x"></i>  Exit Manager</a>
            </div>
        )
    }
}

export default EventManager