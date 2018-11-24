import React, { Component } from "react";
import "./faq.css"
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import ReactGA from 'react-ga';

class faq extends Component {
    constructor(props) {
        super(props);
        this.state = { responseId: 0 }
        this.showAnswer = this.showAnswer.bind(this);
    }
    componentDidMount(){
        document.title = "FAQ";
        ReactGA.pageview('/faq');

    }
    showAnswer(id) {
        if (this.state.responseId !== id) {
            this.setState({ responseId: id });

        }
    }
    render() {
        const faqContent = [
            { id: 0, response: "We are a group of GA smash players who want to bring the community closer than ever before. Our goal is to accelerate the evolution of the GA smash scene and eventually expand to the rest of the U.S." },
            { id: 1, response: "This is our flagship platform for SmashATL, designed to centralize everything you need to be involved with your community and optimized for ease of access." },
            { id: 2, response: "Right now, Facebook is the leading board in which users communicate everything smash-related due to the already present users and groups, etc. However, we feel like we can do better, and it all starts with our home scene." },
            { id: 3, response: "As of 11/23/18, we are currently working on implementing social networking features to connect our playerbase and TO's. For now, only basic features are available." }
        ]
        const responseContent = faqContent[this.state.responseId].response

        return (
            
            <div className="faq-content">
            <BrowserView>
                <div className="left-bar">
                    <ul className="ul-directory">
                        <li className={this.state.responseId == 0 ? "showing" : ""} onClick={() => this.showAnswer(0)}>Who are you?</li>
                        <li className={this.state.responseId == 1 ? "showing" : ""} onClick={() => this.showAnswer(1)}>What is this?</li>
                        <li className={this.state.responseId == 2 ? "showing" : ""} onClick={() => this.showAnswer(2)}>So why does this exist?</li>
                        <li className={this.state.responseId == 3 ? "showing" : ""} onClick={() => this.showAnswer(3)}>Now what?</li>
                    </ul>
                </div>
                <div className="main-content">
                    <div className="answer-content">
                        <p>{responseContent}</p>
                    </div>
                </div>
                </BrowserView>
                <MobileView>
                <div className="top-bar">
                    <ul className="ul-directory">
                        <li className={this.state.responseId == 0 ? "showing" : ""} onClick={() => this.showAnswer(0)}>Who are you?</li>
                        <li className={this.state.responseId == 1 ? "showing" : ""} onClick={() => this.showAnswer(1)}>What is this?</li>
                        <li className={this.state.responseId == 2 ? "showing" : ""} onClick={() => this.showAnswer(2)}>So why does this exist?</li>
                        <li className={this.state.responseId == 3 ? "showing" : ""} onClick={() => this.showAnswer(3)}>Now what?</li>
                    </ul>
                </div>
                <div className="main-content">
                    <div className="answer-content">
                        <p>{responseContent}</p>
                    </div>
                </div>
                </MobileView>
            </div>
        
        )
    }
}

export default faq;