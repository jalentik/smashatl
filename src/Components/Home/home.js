import React, { Component } from "react";
import gamap from '../../Media/gamap.png';
class home extends Component {
    render() {
        return (
            
            <div className="content-home">
                <img src={gamap} className="ga-img"/>
                <div className="home-text"  >
                    <h1>Find Georgia Locals</h1>
                    <h2>Join the competition and find players near you.</h2>
                </div>
                <input type="text" placeholder="e.g. Woodstock"/>

            </div>

        )
    }
}

export default home;