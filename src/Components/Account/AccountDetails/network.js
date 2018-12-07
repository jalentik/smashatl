import React, { Component, createRef } from "react";
import './network.css'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    mobileModel
} from "react-device-detect";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
    Route,
    NavLink,
    Switch,
    BrowserRouter,
    withRouter,
    Link
} from "react-router-dom";
import { timingSafeEqual } from "crypto";
import $ from 'jquery';
import star_icon from '../../../Media/star_icon.png';
class Channel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            UserCount: 0,
            Created: new Date(),
            CreatedBy: "",
            RoomId: this.props.match.params.roomId,
            ChannelName: "",
            Messages: [],
            CurrentUser: {},
            CurrentChannel: {},
            Members: [],
            NewMessageBody: "",
            MessageLimitTime: new Date(),
            MessagesSinceLimitTime: 0
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.appendMessageToList = this.appendMessageToList.bind(this);
        this.addMemberToChannel = this.addMemberToChannel.bind(this);
        this.onNewMessageChange = this.onNewMessageChange.bind(this);

    }
    componentWillMount() {

    }
    componentDidMount() {

        fetch('http://localhost:58418/api/pusher/getroom?roomId=' + this.state.RoomId).then(
            res => { if (res.ok) return res.json(); else throw new Error("Failed to load data for this room.") }
        ).then(
            json => {

                this.setState({ Name: json.Name })
                this.setState({ Description: json.Description })
                this.setState({ Tag: json.Tag })
                this.setState({ Messages: json.Messages }, () => this.scrollToBottom())
                this.setState({ ChannelName: json.ChannelName })
                var channel = this.props.pusher.subscribe(json.ChannelName)
                channel.bind('pusher:subscription_succeeded', function (members) {
                    console.log(members)

                }, this)
                channel.bind('pusher_internal:subscription_succeeded', function (members) {
                   
                }, this)
                channel.bind('incoming-message', function (msg) {
                    var messages = this.state.Messages;
                    messages.push(msg);
                    this.setState({ Messages: messages }, () => this.scrollToBottom())
                }, this)
                this.setState({ CurrentChannel: channel })

                var msgs = this.state.Messages;
                var msg = {
                    Tag: "SYSTEM",
                    Body: "This is an open channel, feel free to talk about anything here. Please be kind and considerate to others. Thank you.",
                    Roles: "App.Staff"
                }
                msgs.push(msg);
                this.setState({ Messages: msgs }, () => this.scrollToBottom())
            }
        ).catch(
            err => console.log(err)
        )


    }
    resetMessageLimitTimer() {
        this.setState({ MessageLimitTime: new Date() })
    }
    incrementMessageCount() {
        this.setState({ MessagesSinceLimitTime: this.state.MessagesSinceLimitTime += 1 })
    }
    checkMessageLimit() {
    }
    scrollToBottom() {
        var chatDiv = document.getElementById("channel-chat");
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }
    handleKeyPress(target) {
        if (target.charCode == 13) {
            this.appendMessageToList(this.props.appUserId, this.state.NewMessageBody, this.state.RoomId)
            document.getElementById('chat-message-input').blur();
            this.setState({ NewMessageBody: "" })
        }

    }
    onNewMessageChange(e) {
        this.setState({ NewMessageBody: e.target.value })
    }
    appendMessageToList(appUserId, body, roomId) {
        fetch('http://localhost:58418/api/pusher/postMessageToRoom', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
                appUserId: appUserId,
                messageContent: body,
                roomId: roomId
            })
        }).then(
            res => { if (res.ok) return; else throw new Error(res.text) }
        )
            .catch(err => { var msgs = this.state.Messages; console.log(err);/* msgs.push({Body: err, Tag: "System", Created: Date.now()});*/ });
    }
    addMemberToChannel(memberId, memberInfo) {
        var members = this.state.Members;
        members.push(memberInfo);
        this.setState({ Members: memberInfo })

    }
    render() {
        const Messages = this.state.Messages ? this.state.Messages.map((msg) => {
            var roles = msg.Roles.toString();
            var classNames = "";
            var isAdmin = roles.indexOf("App.Administrator") > -1;
            var isOwner = roles.indexOf("App.Owner") > -1;
            var isStaff = roles.indexOf("App.Staff") > -1;
            var icons = [];

            if (isAdmin) {
                classNames += "wrapper";
                icons.push("far fa-crown")
            }
            else if (isOwner) {
                classNames += "wrapper";
                icons.push("fa fa-bomb")
            }
            else if (isStaff) {
                classNames += "wrapper";
                icons.push("fa fa-gamepad")
            }
            return (
                <div className={"chat-message-item"}>
                    <span className="icon-container">
                        {icons.map((icon) => <i hidden={!isAdmin} aria-hidden="true" className={isAdmin || isStaff || isOwner ? "icon-buff-admin wrapper " + icon : ""}></i>)}
                    </span>
                    <span className="chat-message-user-tag">
                        {msg.Tag}:
                    </span>
                    <span className="chat-message-body">
                        {msg.Body}
                    </span>
                </div>
            )
        }) : null;
        const Presence = this.state.Presence;
        const Name = this.state.Name;
        const UserCount = this.state.UserCount;
        const Created = this.state.Created;
        const CreatedBy = this.state.CreatedBy;
        const NewMessageBody = this.state.NewMessageBody;
        const IconClasses = {

        }
        return (
            <CSSTransition classNames="page-transition">
                <div className="channel-container">
                    <h2>
                        {Name}
                    </h2>

                    <div id="channel-chat" className="chat-window">
                        {Messages}
                    </div>
                    <div className="chat-message-container">
                        <input id="chat-message-input" className="chat-message-input" type="text" maxLength="100" placeholder="New Message" onChange={this.onNewMessageChange} value={NewMessageBody} onKeyPress={this.handleKeyPress} />
                    </div>
                    <div className="back-container">

                        <a onClick={this.props.onUnmount} className="go-back-arrow"><i className="fa fa-arrow-left fa-2x"></i></a>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

class ChannelCreate extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            Name: "", Description: "", IsPrivate: false, Password: "", CreatedBy: this.props.AppUserId,
            errorText: "", isLoading: false
        }
        this.onInputChanged = this.onInputChanged.bind(this);
        this.setValidationError = this.setValidationError.bind(this);
        this.toggleIsLoading = this.toggleIsLoading.bind(this);
    }
    onFormSubmit(e) {
        console.log(e);
        e.preventDefault();
        var valid = true;
        this.setValidationError("");
        
        if(!this.state.Name){this.setValidationError("Please enter a channel name."); valid = false;}
        if(!this.state.Description){this.setValidationError("Please enter a channel description."); valid = false;}
        if(!this.state.Password && this.state.IsPrivate){this.setValidationError("Please enter a password for your private room.");valid = false;}


        if(valid){
        this.toggleIsLoading();
        fetch("http://localhost:58418/api/pusher/CreateRoom", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: this.state.Name,
                Description: this.state.Description,
                IsPrivate: this.state.IsPrivate,
                Password: this.state.Password,
                CreatedBy: this.state.CreatedBy
            })
        }).then(res => { if (res.ok) { this.toggleIsLoading(); this.props.onCreate();  } else throw new Error("Failed to create channel.") })
            .catch(err =>{this.setValidationError("Failed to create channel.");  console.log(err); this.toggleIsLoading(); })
    }
    }
    setValidationError(errorText) {
        this.setState({ errorText: errorText })
    }

    toggleIsLoading() {
        this.setState({ isLoading: !this.state.isLoading })
    }

    onInputChanged(e) {
        console.log(e.target.type)
        switch (e.target.type) {
            case "text":
                this.setState({ [e.target.name]: e.target.value })
                break;
            case "checkbox":
                this.setState({ [e.target.name]: e.target.checked })
                break;
        }
    }
    render() {
        const Name = this.state.Name;
        const Description = this.state.Description;
        const IsPrivate = this.state.IsPrivate;
        const Password = this.state.Password;
        const isLoading = this.state.isLoading;
        const errorText = this.state.errorText;
        return (
        <div className="modal-background">
            <div className="modal channel-create-container">
            <h2>Create Channel</h2>
            <p className="text-muted"> Please note that you may only have two channels open at any one time.</p>
                <CSSTransition in={!isLoading} classNames="page-transition" timeout={500}>
                    <form onSubmit={this.onFormSubmit} className="channel-create-form">
                        <p>Channel Name</p>
                        <input name="Name" onChange={this.onInputChanged} value={Name} type="text" placeholder="" />
                        <p>Description</p>
                        <input name="Description"  onChange={this.onInputChanged} value={Description} type="text" />
                        <div className="check-field-container">
                            <p>Private?</p>
                            <input name="IsPrivate"  onChange={this.onInputChanged} checked={IsPrivate} type="checkbox" />
                        </div>
                        <CSSTransition in={IsPrivate} unmountOnExit classNames="page-transition">
                        <div>
                        <p>Channel Password</p>
                            <input name="Password" onChange={this.onInputChanged} value={Password} type="text" />
                            </div>
                        </CSSTransition>
                        <span className="error-container">
                            <p className="error-text">{errorText}</p>
                        </span>
                        <input style={{width: "80%", background: "none", color:"#000"}} type="submit" />

                    </form>
                </CSSTransition>
                <CSSTransition unmountOnExit in={isLoading} classNames="page-transition">
                    <i className="loading-spinner fa fa-spinner fa-spin fa-4x"></i>
                </CSSTransition>
            </div>
            </div>
        )
    }
}
class Network extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [], currentRoomId: -1, isLoading: false,
            channels: [], isCreating: false
        }
        this.setCurrentRoom = this.setCurrentRoom.bind(this);
        this.channelUnmountHandler = this.channelUnmountHandler.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.onChannelCreated = this.onChannelCreated.bind(this);
        this.createChannel = this.createChannel.bind(this);
    }
    componentDidMount() {
        this.getRooms();
        
        if ($('.channel-container').length) {
            this.setState({ isInRoom: true })
        }
       if(this.props.Pusher){
            var channel = this.props.Pusher.subscribe("presence-network")

        
       }
     
    }
    componentWillUnmount(){
        this.props.Pusher.unsubscribe("presence-network")
    }
    createChannel(){
       this.setState({isCreating: true})
       this.props.location.pathname = "Account/AccountDetails/Network/Create"
       console.log(this.props.location)
    }
    onChannelCreated(){
        this.setState({isCreating: false});
        this.props.location.pathname = "Account/AccountDetails/Network"
    }
    getRooms(){
        
        this.setState({ isLoading: true })
        fetch("http://localhost:58418/api/pusher/getopenrooms", {
            method: 'GET'
        }).then(res => { if (res.ok) return res.json(); else throw new Error("Connection failure.") })
            .then(data => {
                this.setState({ rooms: data })
                this.setState({ isLoading: false })

            }).catch(err => {
                alert('An error occurred while loading channels.');
                this.setState({ isLoading: false });
            })

    }

    setCurrentRoom(id) {
        this.setState({ currentRoomId: id })
        if (id > -1) {
            this.props.history.push("/Account/AccountDetails/Network/" + id)
            //this.props.location.pathname += '/' + id;
        }
        else {
            this.props.history.push("/Account/AccountDetails/Network")
            //this.props.location.pathname = "Account/AccountDetails/Network"
        }
    }

    channelUnmountHandler() {
        this.setCurrentRoom(-1);
    }
  
    render() {
        
        const isCreating = this.state.isCreating;
        const currentRoomId = this.state.currentRoomId;
        const pusher = this.props.Pusher;
        const isInRoom = this.state.currentRoomId && this.state.currentRoomId > -1;
        const isLoading = this.state.isLoading;
        const rooms = this.state.rooms.map((room) => {
            
            return (
              
                <li key={room.roomId}>
                    <a onClick={() => this.setCurrentRoom(room.RoomId)}>
                        <h3>{room.Name}</h3>
                        <h5>{room.Description}</h5>
                        <div className="room-info-footer">
                            <span><i className="fa fa-users"></i></span>
                        </div>
                    </a>
                </li>

            )
        })

        return (

            <div className="network-container">
                   
                <MobileView>
                    <a className="new-room-btn" onClick={this.createChannel}>
                        <i className="fa fa-plus fa-2x"></i>
                    </a>
                    <h1>Network</h1>
                    <CSSTransition in={isCreating} unmountOnExit classNames="page-transition">
                    <ChannelCreate AppUserId={this.props.userDetails.appuserid} onCreate={this.onChannelCreated}/>
                    </CSSTransition>
                    <Route
                        path="/Account/AccountDetails/Network/:roomId"
                        render={(props) => <Channel {...props} appUserId={this.props.userDetails.appuserid} pusher={pusher} onUnmount={this.channelUnmountHandler} />}
                    />
                    <div hidden={isInRoom}>
                        <h2>Current Open Channels</h2>
                        <CSSTransition in={!isLoading} classNames="page-transition">
                            <ul className="rooms-container">
                                {rooms}
                            </ul>
                        </CSSTransition>
                        <CSSTransition in={isLoading} classNames="page-transition">
                            <i className="loading-spinner fa fa-spinner fa-spin fa-4x"></i>
                        </CSSTransition>
                    </div>
                    <div hidden={!isInRoom}>
                        <ul>

                        </ul>
                    </div>
                </MobileView>
            </div>
        )
    }
}

export default Network