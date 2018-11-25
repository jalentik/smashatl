import React, { Component } from "react";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import statesRepo from '../States';
import './events.css';
import ReactGA from 'react-ga';

class NewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            url: "",
            logoUrl: "",
            date: new Date(Date.now()),
            venueName: "",
            venueFee: 0.00,
            venueCloseTime: null,
            address: {
                street1: "",
                street2: "",
                city: "",
                state: "",
                postalCode: ""
            },
            hasSingles: false,
            singlesFee: 0.00,
            singlesMaxCount: 0,
            hasDoubles: false,
            doublesFee: 0.00,
            doublesMaxCount: 0,
            potBonus: 0.00,
            singlesStartTime: null,
            doublesStartTime: null,
            setupDiscount: 0.00,
            hasSetupDiscount: false,
            setupDiscountLimit: 0,
            createdBy: this.props.activeUserId,
            created: new Date(Date.now())
        }
        this.states = statesRepo.states;

        this.urlChange = this.urlChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.logourlChange = this.logourlChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.venueNameChange = this.venueNameChange.bind(this);
        this.venueFeeChange = this.venueFeeChange.bind(this);
        this.venueCloseTimeChange = this.venueCloseTimeChange.bind(this);
        this.potBonusChange = this.potBonusChange.bind(this);
        this.street1Change = this.street1Change.bind(this);
        this.street2Change = this.street2Change.bind(this);
        this.cityChange = this.cityChange.bind(this);
        this.stateChange = this.stateChange.bind(this);
        this.postalCodeChange = this.postalCodeChange.bind(this);
        this.hasSinglesChange = this.hasSinglesChange.bind(this);
        this.singlesFeeChange = this.singlesFeeChange.bind(this);
        this.singlesStartTimeChange= this.singlesStartTimeChange.bind(this);
        this.singlesMaxCountChange = this.singlesMaxCountChange.bind(this);
        this.hasDoublesChange = this.hasDoublesChange.bind(this);
        this.doublesFeeChange = this.doublesFeeChange.bind(this);
        this.doublesStartTimeChange = this.doublesStartTimeChange.bind(this);
        this.doublesMaxCountChange = this.doublesMaxCountChange.bind(this);
        this.hasSetupDiscountChange = this.hasSetupDiscountChange.bind(this);
        this.setupDiscountChange = this.setupDiscountChange.bind(this);
        this.setupDiscountLimitChange = this.setupDiscountLimitChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.postSubmitHandler = this.props.postSubmitHandler.bind(this);
    }
    componentDidMount(){
        ReactGA.pageview('/events/newevent');
    }
    nameChange(e) {
        this.setState({ name: e.target.value });
    }

    descriptionChange(e) {
        this.setState({ description: e.target.value });
    }

    urlChange(e) {
        this.setState({ url: e.target.value });
    }

    logourlChange(e) {
        this.setState({ logoUrl: e.target.value });
    }

    dateChange(e) {
        this.setState({ date: e.target.value });
    }

    venueNameChange(e) {
        this.setState({ venueName: e.target.value });
    }

    venueFeeChange(e) {
        this.setState({ venueFee: e.target.value });
    }

    venueCloseTimeChange(e) {
        this.setState({ venueCloseTime: e.target.value });
    }

    potBonusChange(e) {
        this.setState({ potBonus: e.target.value });
    }

    street1Change(e) {
        var address = this.state.address;
        address["street1"] = e.target.value;
        this.setState({ address });
    }

    street2Change(e) {
        var address = this.state.address;
        address["street2"] = e.target.value;
        this.setState({ address });
    }

    cityChange(e) {
        var address = this.state.address;
        address["city"] = e.target.value;
        this.setState({ address });
    }

    stateChange(e) {
        var address = this.state.address;
        address["state"] = e.target.value;
        this.setState({ address });
    }

    postalCodeChange(e) {
        var address = this.state.address;
        address["postalCode"] = e.target.value;
        this.setState({ address });
    }

    hasSinglesChange(e) {
        this.setState({ hasSingles: e.target.checked });
    }

    hasDoublesChange(e) {
        this.setState({ hasDoubles: e.target.checked });
    }
    singlesFeeChange(e) {
        this.setState({ singlesFee: e.target.value });
    }
    doublesFeeChange(e) {
        this.setState({ doublesFee: e.target.value })
    }
    singlesStartTimeChange(e) {
        this.setState({ singlesStartTime: e.target.value })
    }
    doublesStartTimeChange(e) {
        this.setState({ doublesStartTime: e.target.value })
    }
    singlesMaxCountChange(e) {
        this.setState({ singlesMaxCount: e.target.value })
    }
    doublesMaxCountChange(e) {
        this.setState({ doublesMaxCount: e.target.value })
    }
    hasSetupDiscountChange(e) {
        this.setState({ hasSetupDiscount: e.target.checked })
    }
    setupDiscountChange(e) {
        this.setState({ setupDiscount: e.target.value })
    }
    setupDiscountLimitChange(e) {
        this.setState({ setupDiscountLimit: e.target.value })
    }

    submitForm(e) {
        e.preventDefault();
        fetch("http://smashatlapi-prod.us-east-2.elasticbeanstalk.com/api/events/postevent", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
            .then(results => {
                if (!results.ok) { this.toggleHasError(); throw new Error("Something went wrong.") }
                else {
                    return results.json();

                }
            })
            .then(data => {

                this.postSubmitHandler();
            })
            .catch(error => {
                alert('Something went wrong. Make sure you filled out necessary fields, otherwise check with the admin.')
            })
    }
    render() {
        const url = this.state.url;
        const name = this.state.name;
        const description = this.state.description;
        const date = this.state.date;
        const logoUrl = this.state.logoUrl;
        const venueName = this.state.venueName;
        const venueFee = this.state.venueFee;
        const venueCloseTime = this.state.venueCloseTime;
        const hasSingles = this.state.hasSingles;
        const hasDoubles = this.state.hasDoubles;
        const singlesFee = this.state.singlesFee;
        const doublesFee = this.state.doublesFee;
        const singlesMaxCount = this.state.singlesMaxCount;
        const doublesMaxCount = this.state.doublesMaxCount;
        const singlesStartTime = this.state.SinglesStartTime;
        const doublesStartTime = this.state.DoublesStartTime;
        const potBonus = this.state.potBonus;
        const setupDiscount = this.state.setupDiscount
        const hasSetupDiscount = this.state.hasSetupDiscount;
        const setupDiscountLimit = this.state.setupDiscountLimit;
        const street1 = this.state.address.street1;
        const street2 = this.state.address.street2;
        const city = this.state.address.city;
        const state = this.state.address.state;
        const postalCode = this.state.address.postalCode;

        const stateItems = this.states.map((state) =>
            <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
        );
        return (
            <div key="new-event" className="new-event-window">
                <MobileView viewClassName="new-event-modal-container">
                    <div onClick={this.toggleShow}  className="modal-background">
                        <div className="modal new-event-modal">
                        <h1>New Event</h1>
                    <div style={{display: 'inline-block'}}><span style={{color:'red'}}>*</span>= required.</div>
                            <form onSubmit={this.submitForm}>
                                <h2>
                                    Details
                             </h2>
                                <div className="form-items-container">
                                    <p>Event URL<span style={{color:'red'}}>*</span></p>
                                    <input onChange={this.urlChange} value={url} type="text" placeholder="http://facebook.com/events/..." />

                                    <p>Event Name<span style={{color:'red'}}>*</span></p>
                                    <input onChange={this.nameChange} value={name} type="text" placeholder="My Event Name" />

                                    <p>Description</p>
                                    <input onChange={this.descriptionChange} value={description} type="text" placeholder="Some details about my tournament" />
                                    <div className="item-row-container">

                                        <p>Event Start Date<span style={{color:'red'}}>*</span></p>
                                        <input onChange={this.dateChange} value={date} type="date" />
                                    </div>
                                    <p>Logo Url</p>
                                    <input onChange={this.logourlChange} value={logoUrl} type="text" placeholder="http://myimagehost.com/myimage.png" />

                                    <p>Venue Name<span style={{color:'red'}}>*</span></p>
                                    <input onChange={this.venueNameChange} value={venueName} type="text" placeholder="Hosting venue's name" />


                                    <div className="item-row-container">
                                        <p>Venue Fee</p>
                                        <input onChange={this.venueFeeChange} value={venueFee} type="number" placeholder="0.00" />
                                    </div>
                                    <div className="item-row-container">

                                        <p>Venue Close Time</p>
                                        <input onChange={this.venueCloseTimeChange} value={venueCloseTime} type="time" />
                                    </div>
                                    <div className="item-row-container">

                                        <p>Singles?</p>
                                        <input type="checkbox" onChange={this.hasSinglesChange} checked={hasSingles} />
                                    </div>
                                    <CSSTransition
                                        in={hasSingles}
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
                                                    <input onChange={this.singlesStartTimeChange} value={singlesStartTime} type="time" />
                                                </div>
                                                <div className="item-row-container">

                                                    <p>Singles Fee</p>
                                                    <input onChange={this.singlesFeeChange} value={singlesFee} type="number" step="0.01" placeholder="" />
                                                </div>
                                                <div className="item-row-container">

                                                    <p>Max Singles Entrants</p>
                                                    <input onChange={this.singlesMaxCountChange} value={singlesMaxCount} type="number" placeholder="" />
                                                </div>
                                            </div>
                                        )
                                        }
                                    </CSSTransition>


                                    <div className="item-row-container">

                                        <p>Doubles?</p>
                                        <input type="checkbox" onChange={this.hasDoublesChange} checked={hasDoubles} />
                                    </div>
                                    <CSSTransition
                                        in={hasDoubles}
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
                                                    <input onChange={this.doublesStartTimeChange} value={doublesStartTime} type="time" />
                                                </div>
                                                <div className="item-row-container">
                                                    <p>Doubles Fee</p>
                                                    <input onChange={this.doublesFeeChange} value={doublesFee} step="0.01" type="number" placeholder="" />
                                                </div>
                                                <div className="item-row-container">

                                                    <p>Max Doubles Entrants</p>
                                                    <input onChange={this.doublesMaxCountChange} value={doublesMaxCount} type="number" placeholder="" />
                                                </div>
                                            </div>
                                        )
                                        }
                                    </CSSTransition>


                                    <div className="item-row-container">

                                        <p>Pot Bonus</p>
                                        <input onChange={this.potBonusChange} value={potBonus} type="number" placeholder="" />
                                    </div>
                                    <div className="item-row-container">

                                        <p>Setup Discount?</p>
                                        <input onChange={this.hasSetupDiscountChange} checked={hasSetupDiscount} type="checkbox" placeholder="" />
                                    </div>
                                    <CSSTransition
                                        in={hasSetupDiscount}
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
                                                    <input onChange={this.setupDiscountChange} value={setupDiscount} type="number" placeholder="" min="0.01" step="0.01" />
                                                </div>
                                                <div className="item-row-container">

                                                    <p>Setup Discount Limit</p>
                                                    <input onChange={this.setupDiscountLimitChange} value={setupDiscountLimit} type="number" placeholder="" />
                                                </div>
                                            </div>
                                        )
                                        }
                                    </CSSTransition>

                                </div>

                                <h2>
                                    Location<span style={{color:'red'}}>*</span>
                                        </h2>
                                <div className="form-items-container">
                                    <p>Street Address</p>
                                    <input onChange={this.street1Change} value={street1} type="text" placeholder="42 Wallaby Way" />

                                    <p>Suite/Unit/Apt #</p>
                                    <input onChange={this.street2Change} value={street2} type="text" placeholder="Suite 103" />

                                    <p>City</p>
                                    <input onChange={this.cityChange} value={city} type="text" placeholder="Sydney" />

                                    <p>State</p>
                                    <select onChange={this.stateChange} placeholder="Select State" value={state}>
                                        {stateItems}
                                    </select>

                                    <p>Postal Code</p>
                                    <input onChange={this.postalCodeChange} value={postalCode} type="text" placeholder="12345" />
                                </div>

                                <input type="submit" value="Submit" style={{marginBottom: "30px"}} />
                            </form>

                        </div>
                    </div>
                </MobileView>
            </div>

        )
    }
}

export default NewEvent;