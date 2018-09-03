import React, { Component } from "react";
import "./account.css"
import gc from '../../Media/gc.png'
import { Route, Redirect } from 'react-router'
class UserDetailRegistration extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="reg-container">
                <input />
                <input />
                <input />
            </div>
        )
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { error: false, inProgress: false, user: "", pass: "", hasError: false, errorMsg: "" }
        this.loginUser = this.loginUser.bind(this);
        this.userChanged = this.userChanged.bind(this);
        this.passChanged = this.passChanged.bind(this);
        this.toggleHasError = this.toggleHasError.bind(this);
        this.checkEnterKeyPress = this.checkEnterKeyPress.bind(this);
    }
    checkEnterKeyPress(e){
      if(e.key === "Enter"){
          this.loginUser();
      }
    }
    userChanged(u) {
        if (u) {
            this.setState({ user: u.target.value })
        }
    }
    passChanged(p) {
        if (p) {
            this.setState({ pass: p.target.value })
        }
    }
    toggleHasError(){
        this.setState({hasError: !this.state.hasError })
        console.log(this.state.hasError)
    }
    loginUser() {
        var u = this.state.user;
        var p = this.state.pass;
        if(this.state.hasError){
            this.toggleHasError();
        }
        if (u && p) {
            fetch("http://smashatlapi-dev.us-east-2.elasticbeanstalk.com/api/appuserdetails/authorizeuser", { //http://smashatlapi-dev.us-east-2.elasticbeanstalk.com/api/appuserdetails/auth
                method: 'POST',
                headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    User: u,
                    Pass: p
                })
            })
                .then(results => {
                        if(!results.ok){this.toggleHasError(); throw new Error("Something went wrong.")}
                        else{
                             return results.json();
                            
                        }
                })
                .then(data => {
                    this.props.props.setUserDetails(data)
                            this.props.props.userHasAuthenticated(true);
                            this.props.props.history.push('/account/accountdetails/')
                })
                .catch(error =>{
                    this.setState({errorMsg: "Something went wrong."})
                    this.toggleHasError();
                })



        }
    }
    render() {
        const inProgress = this.state.inProgress;
        const user = this.state.user;
        const pass = this.state.pass;
        const hasError = this.state.hasError;
        const errorMsg = this.state.errorMsg;
        return (
            <div className="login-form">
                <input hidden={inProgress} onKeyPress={this.checkEnterKeyPress} onChange={this.userChanged} value={user} type="text" placeholder="Username" />
                <input hidden={inProgress} onKeyPress={this.checkEnterKeyPress} onChange={this.passChanged} value={pass} type="password" placeholder="Password" />
                <div hidden={inProgress} className="btn-wrapper" >
                    <div className="btn" style={{cursor:"pointer"}} onClick={this.loginUser}>GO</div>
                </div>
                <p className={"error"}>{errorMsg}</p>
                <div hidden={!inProgress}>
                    Loading!

                </div>
                <div>

                </div>
            </div>
        )
    }
}
class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.formSubmitted = this.formSubmitted.bind(this);
        this.state = { user: "", pass: "", confirm: "", email: "", zipcode: "", tag: "", phone: "" }
        this.userChanged = this.userChanged.bind(this)
        this.passChanged = this.passChanged.bind(this)
        this.confirmChanged = this.confirmChanged.bind(this)
        this.zipcodeChanged = this.zipcodeChanged.bind(this)
        this.tagChanged = this.tagChanged.bind(this)
        this.emailChanged = this.emailChanged.bind(this)
        this.phoneChanged = this.phoneChanged.bind(this)

    }
    userChanged(user) {
        this.setState({ user: user.target.value })
    }
    passChanged(pass) {
        this.setState({ pass: pass.target.value })
    }
    emailChanged(email) {
        this.setState({ email: email.target.value })
    }
    confirmChanged(confirm) {
        this.setState({ confirm: confirm.target.value })
    }
    zipcodeChanged(zipcode) {
        this.setState({ zipcode: zipcode.target.value })
    }
    tagChanged(tag) {
        this.setState({ tag: tag.target.value })
    }
    phoneChanged(phone) {
        this.setState({ phone: phone.target.value })
    }


    formSubmitted(e) {
        e.preventDefault();
        if (this.state.user && this.state.pass && this.state.confirm && this.state.email && this.state.zipcode && this.state.pass === this.state.confirm && this.state.tag) {
            this.btnSignup.disabled = true;
            fetch('http://smashatlapi-dev.us-east-2.elasticbeanstalk.com/api/applocations/getapplocations/' + this.state.zipcode, {
                method:'GET',
                
            }).then(response => response.json()).then(zip =>{})

            fetch('http://smashatlapi-dev.us-east-2.elasticbeanstalk.com/api/appuserdetails/postappuserdetail', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    username: this.state.user,
                    passwordHash: this.state.pass,
                    email: this.state.email,
                    tag: this.state.tag,
                    phone: this.state.phone ? this.state.phone : ""
                })

            }).then(results => results.json())
                .then(response => {
                    console.log(response)
                    this.btnSignup.disabled = false;
                    if (response.id) {
                        this.props.props.setUserDetails(response);
                        this.props.props.userHasAuthenticated(true);
                        return (
                            <Redirect to="/account/accountdetails" />
                        )
                    }
                }).catch(error => {
                    console.log(error);
                    this.btnSignup.disabled = false;
                })
        } else {
            this.btnSignup.disabled = false;
            if (!this.state.user) {
                this.user.className = "validation-fail"
            } else {
                this.user.className = ""
            }
            if (!this.state.pass) {
                this.pass.className = "validation-fail"
            } else {
                this.pass.className = ""
            }
            if (!this.state.confirm) {
                this.confirm.className = "validation-fail"
            } else {
                this.confirm.className = ""
            }
            if (!this.state.email) {
                this.email.className = "validation-fail"
            } else {
                this.email.className = ""
            }
            if (!this.state.zipcode) {
                this.zipcode.className = "validation-fail"
            } else {
                this.zipcode.className = ""
            }
            if (!this.state.tag) {
                this.tag.className = "validation-fail"
            } else {
                this.tag.className = ""
            }
        }
    }
    render() {
        return (
            <form className="signup-form" onSubmit={this.formSubmitted}>
                <div className="signup-form-left">

                    <input id="user" ref={user => this.user = user} value={this.state.user} onChange={this.userChanged} type="text" placeholder="Username" />
                    <input id="pass" ref={pass => this.pass = pass} value={this.state.pass} onChange={this.passChanged} type="password" placeholder="Password" />
                    <input id="confirm" ref={confirm => this.confirm = confirm} value={this.state.confirm} onChange={this.confirmChanged} type="password" placeholder="Confirm Password" />
                    <input id="email" ref={email => this.email = email} value={this.state.email} onChange={this.emailChanged} type="email" placeholder="E-Mail Address" />
                    <input id="zipcode" ref={zipcode => this.zipcode = zipcode} value={this.state.zipcode} onChange={this.zipcodeChanged} type="text" placeholder="Zipcode" />
                    <input id="tag" ref={tag => this.tag = tag} value={this.state.tag} onChange={this.tagChanged} type="text" placeholder="Tag" />
                    <input id="phone" ref={phone => this.phone = phone} value={this.state.phone} onChange={this.phoneChanged} type="text" placeholder="Phone (Optional)" />

                </div>
                <div className="signup-form-right">
                    <h1>Welcome</h1>
                    <h2> With every new user, we get closer to our goal of becoming the #1 platform for the smash community in our lovely state of GA. Thank you, and we look forward to growing with you as individuals and as a community.</h2>
                    <div className="btn-wrapper">
                        <input ref={btnSignup => this.btnSignup = btnSignup}  style={{cursor:"pointer"}} className="btn" type="submit" value="JOIN" />
                        <div className="validation-message"></div>
                    </div>
                </div>
            </form>
        )
    }
}
class account extends Component {
    constructor(props) {
        super(props);
        this.state = { tab: "login" };
        this.tabChange = this.tabChange.bind(this);
    }
    tabChange(tab) {
        this.setState({ tab })
    }
    componentDidMount() {
        document.title = "Account";
        if(this.props.isAuthenticated){
            this.props.history.push('/account/accountdetails/')
        };

    }
    render() {
        const tab = this.state.tab;
        return (
            <div className="account-content">
                <div className="header-tabs-container">
                    <div  style={{cursor:"pointer"}} className={tab == "login" ? "header-tab-active" : "header-tab"} onClick={() => this.tabChange("login")}>
                        Log In
                    </div>
                    <div  style={{cursor:"pointer"}} className={tab == "signup" ? "header-tab-active" : "header-tab"} onClick={() => this.tabChange("signup")}>
                        Sign Up
                    </div>

                </div>

                <div className="content-container">
                    <div className={tab == "login" ? "Form-container" : "Form-container-hidden"}>
                        <LoginForm props={this.props} />
                    </div>

                    <div className={tab == "signup" ? "Form-container" : "Form-container-hidden"}>
                        <SignupForm props={this.props} />
                    </div>
                </div>

                <div className="account-footer">
                    Powered by Smash ATL
                <img src={gc} />
                </div>
            </div>
        )
    }
}

export default account;