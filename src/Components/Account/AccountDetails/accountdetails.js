import React, { Component } from "react";
import "./accountdetails.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import filterOptions from "../../SmashMap/filterOptions";
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import fbicon from '../../../Media/fb.png';
import twiticon from '../../../Media/twit.png';
import twtchicon from '../../../Media/twitch.png';
var check = require('../../../Media/check-symbol.png')
var network = require('../../../Media/network.svg')
var emptyCheck = require('../../../Media/check-box-empty.png')
var settings = require('../../../Media/settings.svg')
var videoplayer = require('../../../Media/video-player.svg')
var logout = require('../../../Media/exit.svg')
var home = require('../../../Media/home.svg')

const cookies = new Cookies();

class Profile extends Component {
    render() {
        return (
            <div className="personal-form">
                <div id="field-pair">
                    <p id='descriptor'>First Name: </p> <input type="text" placeholder="Your First Name" defaultValue="User.FirstName" />
                </div>

                <div id="field-pair">
                    <p id='descriptor'>Last Name: </p> <input type="text" placeholder="Your Last Name" defaultValue="User.LastName" />
                </div>

                <div id="field-pair">
                    <p id='descriptor'>Address: </p>
                    <input type="text" placeholder="Your Address" defaultValue="User.Address" />
                </div>

                <div className="btn-wrapper">
                    <div className="sub-btn">Submit</div>
                </div>
            </div>
        )
    }
}


class DropdownOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

    }


    handleMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    };
    handleMouseEnter(event) {
        this.props.onFocus(this.props.option, event);
    };
    handleMouseMove(event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    };
    render() {
        return (
            <div className={this.props.className}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                title={this.props.option.title}>

                {this.props.children}
            </div>
        );
    }
}

DropdownOptions.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
}


class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedMain: -1, selectedSecondary: -1, tag: "", twit: "", fb: "", twtch: "", selectedPlaystyle: -1 }
        this.mainSelectionChanged = this.mainSelectionChanged.bind(this);
        this.secondarySelectionChanged = this.secondarySelectionChanged.bind(this);
        this.optionRenderer = this.optionRenderer.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.twitChange = this.twitChange.bind(this);
        this.fbChange = this.fbChange.bind(this);
        this.twtchChange = this.twtchChange.bind(this);
        this.playstyleChange = this.playstyleChange.bind(this);
    }
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                selectedMain: this.props.location.state.main || -1, selectedSecondary: this.props.location.state.secondary || -1,
                tag: this.props.location.state.tag, twit: this.props.location.state.twitterurl || "", fb: this.props.location.state.facebookurl || "",
                twtch: this.props.location.state.twitchurl || "", selectedPlaystyle: this.props.location.state.playstyle || -1
            })
        }
        else if (cookies.get('userDetails')) {
            var userDetails = cookies.get('userDetails');
            this.setState({
                selectedMain: userDetails.main || -1, selectedSecondary: userDetails.secondary || -1,
                tag: userDetails.tag, twit: userDetails.twitterurl || "", fb: userDetails.facebookurl || "",
                twtch: userDetails.twitchurl || "", selectedPlaystyle: userDetails.playstyle || -1
            })
        }
    }
    optionRenderer(option) {
        return (
            <div style={{ height: "40px", display: "flex", width: "100%", flexDirection: "row", alignItems: "center" }}>
                <img style={{ height: "35px", width: "35px" }} src={require("../../../Media/Icons/" + option.thumbnail)} />
                <p style={{ fontFamily: "Quicksand, sans-serif", fontWeight: "500", color: "#3d3d3d", marginLeft: "20px" }}>{option.charName}</p>
            </div>
        )
    }
    mainSelectionChanged(val) {
        this.setState({ selectedMain: val.charId })
    }

    secondarySelectionChanged(val) {
        this.setState({ selectedSecondary: val.charId })
    }
    saveChanges() {
        var twtch = !(this.state.twtch.indexOf("www.") > 0) && !(this.state.twtch.indexOf("http://") > 0) && this.state.twtch ? "http://www." + this.state.twtch : this.state.twtch;
        var fb = !(this.state.fb.indexOf("www.") > 0) && !(this.state.fb.indexOf("http://") > 0) && this.state.fb ? "http://www." + this.state.fb : this.state.fb;
        var twit = !(this.state.twit.indexOf("www.") > 0) && !(this.state.twit.indexOf("http://" > 0) && this.state.twit > 0) ? "http://www." + this.state.twit : this.state.twit;
        if(!twtch.indexOf('twitch.tv') > 0 && twtch.length > 0){alert('Please use a valid twitch address.');return;}
        if(!twit.indexOf('twitter.com') > 0 && twit.length > 0){alert('Please use a valid twitter address.');return;}
        if(!twtch.indexOf('facebook.com') > 0 && twtch.length > 0){alert('Please use a valid facebook address.');return;}

        if (!this.state.selectedMain || !this.state.tag || !this.state.selectedPlaystyle) { alert('A main, tag, and playstyle are required.'); return; }
        fetch("http://smashatlapi-dev.us-east-2.elasticbeanstalk.com/api/appuserdetails/savechanges", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserId: this.props.location.state.id,
                MainId: this.state.selectedMain,
                SecondaryId: this.state.selectedSecondary,
                Tag: this.state.tag,
                TwitchUrl: twtch,
                TwitterUrl: twit,
                FacebookUrl: fb,
                PlaystyleId: this.state.selectedPlaystyle
            })
        })
            .then(results => {
                if (!results.ok) { throw new Error("Something went wrong.") }
                else {
                    alert('Your changes have been saved.')
                    this.props.location.setUserDetails({
                        id: this.props.location.state.id,
                        main: this.state.selectedMain,
                        secondary: this.state.selectedSecondary,
                        tag: this.state.tag,
                        twitchurl: twtch,
                        twitterurl: twit,
                        facebookurl: fb,
                        playstyle: this.state.selectedPlaystyle
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    tagChange(tag) {
        this.setState({ tag: tag.target.value })
    }
    twitChange(tw) {
        this.setState({ twit: tw.target.value })

    }
    fbChange(fb) {
        this.setState({ fb: fb.target.value })

    }
    twtchChange(tt) {
        this.setState({ twtch: tt.target.value })

    }
    playstyleChange(ps) {
        this.setState({ selectedPlaystyle: ps.playId })
    }
    render() {
        const playstyles = filterOptions.playstyle;
        const characters = filterOptions.characters;
        const selectedMain = this.state.selectedMain;
        const selectedSecondary = this.state.selectedSecondary;
        const optionRenderer = this.optionRenderer;
        const selectedPlaystyle = this.state.selectedPlaystyle;
        const twtch = this.state.twtch;
        const twit = this.state.twit;
        const fb = this.state.fb;

        const tag = this.state.tag;

        return (
            <div className="account-settings-content">
            <BrowserView>
                <div className="public-form">
                    <div className="public-form-left">
                        <p id="title">Playstyle</p>
                        <Select
                            className="character-select"
                            placeholder="Select Playstyle"
                            closeOnSelect={true}
                            onChange={this.playstyleChange}
                            options={playstyles}
                            labelKey={"playName"}
                            valueKey={"playId"}
                            value={selectedPlaystyle}
                        />

                        <p id="title">Main</p>
                        <Select
                            optionComponent={DropdownOptions}
                            className="character-select"
                            placeholder="Select your main"
                            closeOnSelect={true}
                            onChange={this.mainSelectionChanged}
                            options={characters}
                            labelKey={"charName"}
                            valueKey={"charId"}
                            value={selectedMain}
                            optionRenderer={optionRenderer}
                        />
                        <p id="title">Secondary</p>
                        <Select
                            optionComponent={DropdownOptions}
                            className="character-select"
                            placeholder="Select your secondary"
                            closeOnSelect={true}
                            onChange={this.secondarySelectionChanged}
                            options={characters}
                            labelKey={"charName"}
                            valueKey={"charId"}
                            value={selectedSecondary}
                            optionRenderer={optionRenderer}
                        />






                    </div>
                    <div className="public-form-right">

                        <p id="title">Facebook</p>
                        <input onChange={this.fbChange} value={fb} type="text" placeholder="www.facebook.com/myfbname" />


                        <p id="title">Twitter</p>
                        <input onChange={this.twitChange} value={twit} type="text" placeholder="www.twitter.com/mytwittername" />

                        <p id="title">Twitch</p>
                        <input onChange={this.twtchChange} value={twtch} type="text" placeholder="www.twitch.tv/mytwitchname" />
                        <p id="title">Tag</p>
                        <input onChange={this.tagChange} value={tag} type="text" placeholder="My tag" />


                    </div>
                </div>
                <a onClick={this.saveChanges} className="save-changes" style={{ cursor: "pointer" }}>Save Changes</a>
                </BrowserView>
                <MobileView viewClassName="mobile-view-details">
                <h3>General</h3>
                <p id="title">Tag</p>
                        <input onChange={this.tagChange} value={tag} type="text" placeholder="My tag" />
                <p id="title">Playstyle</p>
                        <Select
                            className="character-select"
                            placeholder="Select Playstyle"
                            closeOnSelect={true}
                            onChange={this.playstyleChange}
                            options={playstyles}
                            labelKey={"playName"}
                            valueKey={"playId"}
                            value={selectedPlaystyle}
                        />

                        <p id="title">Main</p>
                        <Select
                            optionComponent={DropdownOptions}
                            className="character-select"
                            placeholder="Select your main"
                            closeOnSelect={true}
                            onChange={this.mainSelectionChanged}
                            options={characters}
                            labelKey={"charName"}
                            valueKey={"charId"}
                            value={selectedMain}
                            optionRenderer={optionRenderer}
                        />
                        <p id="title">Secondary</p>
                        <Select
                            optionComponent={DropdownOptions}
                            className="character-select"
                            placeholder="Select your secondary"
                            closeOnSelect={true}
                            onChange={this.secondarySelectionChanged}
                            options={characters}
                            labelKey={"charName"}
                            valueKey={"charId"}
                            value={selectedSecondary}
                            optionRenderer={optionRenderer}
                        />

                        <h3>Social Networks</h3>
                        <div className='social-network-title'><img src={fbicon} style={{ cursor: "pointer" }} className='social-image small' /><span id="title"> Facebook</span></div>
                        <input onChange={this.fbChange} value={fb} type="text" placeholder="www.facebook.com/myfbname" />


                         <div className='social-network-title'><img src={twiticon} style={{ cursor: "pointer" }} className='social-image small' /><span id="title"> Twitter</span></div>
                        <input onChange={this.twitChange} value={twit} type="text" placeholder="www.twitter.com/mytwittername" />

                         <div className='social-network-title'><img src={twtchicon} style={{ cursor: "pointer" }} className='social-image small' /><span id="title">Twitch</span></div>
                        <input onChange={this.twtchChange} value={twtch} type="text" placeholder="www.twitch.tv/mytwitchname" />
                 

                    </MobileView>
                    <a onClick={this.saveChanges} className="save-changes" style={{ cursor: "pointer" }}>Save Changes</a>

            </div>
        )
    }
}
class accounthome extends Component {
    render() {
        if(isMobile){
            return (
            
                <div className="home-text">
                    <h2>
                        Welcome to your account home. If this is your first time logging in, you should head to account settings via the cog icon below and update your account details.
                        Later on, this panel will be utilized as a dashboard to be displayed on login as a summary of current user experiences and updates.
                      </h2>
                </div>
            )
        } else{
            <div className="home-text">
            <h2>
                Welcome to your account home. If this is your first time logging in, you should head to account settings via the cog icon to the left and update your account details.
                Later on, this panel will be utilized as a dashboard to be displayed on login as a summary of current user experiences and updates.
              </h2>
        </div>
        }
       
    }
}
class accountdetails extends Component {
    constructor(props) {
        super(props);
        this.state = { tab: "public", isViewing: false };
        this.tabChange = this.tabChange.bind(this);
        this.setViewing = this.setViewing.bind(this);
        this.LogOutUser = this.LogOutUser.bind(this);
    }
    tabChange(tab) {
        this.setState({ tab })
    }
    setViewing() {
        this.setState({ isViewing: true })
    }
    LogOutUser() {
        this.props.userHasAuthenticated(false);
        this.props.clearUser();
        this.props.history.push("/account")
    }
    render() {
        const tab = this.state.tab;
        const setViewing = this.setViewing;
        return (
            <Router>
                <div className="account-detail-content">
                    <BrowserView>
                        <ul className="account-menu-items">
                            <li id="home-link">
                                <Link to={{
                                    pathname: '/Account/AccountDetails/',
                                    state: this.props.userDetails,
                                    setUserDetails: this.props.setUserDetails,

                                }}>
                                    <img className={"small"} src={home} />
                                </Link>
                            </li>
                            <li><img className={"disabled small"} src={network} /></li>
                            <li id="settings-link" onClick={setViewing}>

                                <Link to={{
                                    pathname: '/Account/AccountDetails/AccountSettings',
                                    state: this.props.userDetails,
                                    setUserDetails: this.props.setUserDetails
                                }}>
                                    <img className={"small"} src={settings} />

                                </Link>

                            </li>
                            <li><img className={"disabled small"} src={videoplayer} /></li>
                            <li id="logout-link"><a style={{ cursor: "pointer" }} onClick={this.LogOutUser}><img className={"small"} src={logout} /></a></li>

                        </ul>

                        <div style={{ maxHeight: "800px", width: "100%", overflowY: "auto", justifyContent: "center", display: "flex" }}>
                            <Route exact path="/Account/AccountDetails/AccountSettings" component={AccountSettings} />
                            <Route exact path="/Account/AccountDetails/" component={accounthome} />
                        </div>
                    </BrowserView>
                    <MobileView>
                    

                        <div style={{ width: "100vw", paddingBottom:"10vh", overflowY: "auto", justifyContent: "center", display: "flex" }}>
                            <Route exact path="/Account/AccountDetails/AccountSettings" component={AccountSettings} />
                            <Route exact path="/Account/AccountDetails/" component={accounthome} />
                        </div>
                        <ul className="account-menu-items">
                            <li id="home-link">
                                <Link to={{
                                    pathname: '/Account/AccountDetails/',
                                    state: this.props.userDetails,
                                    setUserDetails: this.props.setUserDetails,

                                }}>
                                    <img className={"small"} src={home} />
                                </Link>
                            </li>
                            <li><img className={"disabled small"} src={network} /></li>
                            <li id="settings-link" onClick={setViewing}>

                                <Link to={{
                                    pathname: '/Account/AccountDetails/AccountSettings',
                                    state: this.props.userDetails,
                                    setUserDetails: this.props.setUserDetails
                                }}>
                                    <img className={"small"} src={settings} />

                                </Link>

                            </li>
                            <li><img className={"disabled small"} src={videoplayer} /></li>
                            <li id="logout-link"><a style={{ cursor: "pointer" }} onClick={this.LogOutUser}><img className={"small"} src={logout} /></a></li>

                        </ul>
                        </MobileView>
                </div>
            </Router>
        )
    }
}

export default accountdetails;