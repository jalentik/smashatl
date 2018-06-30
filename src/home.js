import React, { Component } from "react";
import gamap from './gamap.png';
class home extends Component {
    render() {
        return (
            <div className="content-home">
                <img src={gamap} style={{ opacity: 0.2, zIndex: -1 }} />
                <div className="home-text">
                    <h1>Find Georgia Locals</h1>
                    <h2>Join the competition and find players near you.</h2>
                </div>
                <input placeholder="e.g. Woodstock" style={{}} />

            </div>

        )
    }
}

export default home;