import React, { Component } from "react";
import "./accountdetails.css";

class PrivateDetails extends Component {
    render() {
        return (
            <div className="personal-form"> 
            <div id="field-pair">
            <p id='descriptor'>First Name: </p> <input type="text" placeholder="Your First Name" defaultValue="User.FirstName"/> 
                </div>
                
                <div id="field-pair">
                <p id='descriptor'>Last Name: </p> <input type="text" placeholder="Your Last Name" defaultValue="User.LastName"/>
                </div>
                
                <div id="field-pair">
                <p id='descriptor'>Address: </p>
                <input type="text" placeholder="Your Address" defaultValue="User.Address"/>
                </div>
                
                <div className="btn-wrapper">
                    <div className="sub-btn">Submit</div>
                </div>
            </div>
        )
    }
}
class PublicDetails extends Component {
    render() {
        return (
            <div className="public-form">
                <div className="public-form-left">
                   <p id="title">Tag</p>
                    <input type="text" placeholder="User.Tag" /> 

                    <p id="title">Preffered Game</p>
                    <input type="text" placeholder="User.PreferedGame" />

                    <p id="title">Bio</p>
                    <textarea cols="40" wrap="hard" placeholder='User.Bio'></textarea> 

                </div>
                <div className="public-form-right">
                    <p id="title">Main</p>
                    <h2> With every new user, we get closer to our goal of becoming the #1 platform for the smash community in our lovely state of GA. Thank you, and we look forward to growing with you as individuals and as a community.</h2>
                    <div className="btn-wrapper">
                        <div className="sub-btn">Submit</div>
                    </div>
                </div>
            </div>
        )
    }
}
class accountdetails extends Component {
    constructor(props) {
        super(props);
        this.state = { tab: "public" };
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
                    <div className={tab == "private" ? "header-tab-active" : "header-tab"} onClick={() => this.tabChange("private")}>
                        Private Details
                    </div>
                    <div className={tab == "public" ? "header-tab-active" : "header-tab"} onClick={() => this.tabChange("public")}>
                        Public Details
                    </div>
                </div>

                <div className="content-container">
                    <div className={tab == "private" ? "private-container" : "private-container-hidden"}>
                        <PrivateDetails />
                    </div>

                    <div className={tab == "public" ? "public-container" : "publicForm-container-hidden"}>
                        <PublicDetails />
                    </div>
                </div>

                <div className="account-footer">
                    Powered by Smash ATL
 
                </div>
            </div>
        )
    }
}

export default accountdetails;