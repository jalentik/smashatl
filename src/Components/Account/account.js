import React, { Component } from "react";
import "./account.css"
import gc from '../../Media/gc.png'

class LoginForm extends Component {
    cosntructor(props){
        super(props);
        this.state = {error: false, inProgress: false}
    }
    render() {
        const inProgress = this.state.inProgress;
        return (
            <div className="login-form">
                <input hidden={inProgress} type="text" placeholder="Username" />
                <input hidden={inProgress} type="password" placeholder="Password" />
                <div hidden={inProgress} className="btn-wrapper" >
                    <div className="btn">GO</div>
                </div>
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
    render() {
        return (
            <div className="signup-form">
                <div className="signup-form-left">
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <input type="text" placeholder="E-Mail Address" />
                </div>
                <div className="signup-form-right">
                    <h1>Welcome</h1>
                    <h2> With every new user, we get closer to our goal of becoming the #1 platform for the smash community in our lovely state of GA. Thank you, and we look forward to growing with you as individuals and as a community.</h2>
                    <div className="btn-wrapper">
                        <div className="btn">JOIN</div>
                    </div>
                </div>
            </div>
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
    render() {
        const tab = this.state.tab;
        return (
            <div className="account-content">
                <div className="header-tabs-container">
                    <div className={tab == "login" ? "header-tab-active" : "header-tab"} onClick={() => this.tabChange("login")}>
                        Log In
                    </div>
                    <div className={tab == "signup" ? "header-tab-active" : "header-tab"} onClick={() => this.tabChange("signup")}>
                        Sign Up
                    </div>
                </div>

                <div className="content-container">
                    <div className={tab == "login" ? "loginForm-container" : "loginForm-container-hidden"}>
                        <LoginForm />
                    </div>

                    <div className={tab == "signup" ? "signupForm-container" : "signupForm-container-hidden"}>
                        <SignupForm />
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