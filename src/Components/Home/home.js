import React, { Component } from "react";
import gamap from '../../Media/gamap.png';
import { withRouter } from 'react-router-dom'

class home extends Component {
    componentDidMount(){
        document.title = "SmashATL";

    }
    render() {
        return (

            <div className="content-home">
                <img src={gamap} className="ga-img" />
                <div className="home-text"  >
                    <h1>Find Georgia Locals</h1>
                    <h2>Join the competition and find players near you.</h2>
                </div>
                
                    <h3>Announcements</h3>
                    Changelog 1:
                    <ul>
                        <li>Users are now active</li>
                        <li>Smashmap is functional aside from social networking.</li>
                        <li>Account settings is active.</li>

                        </ul>
                
            </div>

        )
    }
}

export default home;    