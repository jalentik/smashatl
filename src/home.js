import React, { Component } from "react";
import gamap from './gamap.png';
class home extends Component {
    render() {
        return (
            <div className="content-home" style={{backgroundImage: `url(${gamap})`, backgroundRepeat:'no-repeat'}}>
                <div className="home-text" >
                    <h1>Find Georgia Locals</h1>
                    <h2>Join the competition and find players near you.</h2>
                </div>
                <input type="text" placeholder="e.g. Woodstock" />

            </div>

        )
    }
}

export default home;