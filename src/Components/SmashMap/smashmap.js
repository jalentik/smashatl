import React, { Component } from "react";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import filterOptions from "./filterOptions";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var search = require('../../Media/search.png')
var chevron = require('../../Media/chevron.png')

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap

        defaultZoom={8}
        defaultCenter={{ lat: 33.772079, lng: -84.560692 }}
    >
    </GoogleMap>
))

class smashmap extends Component {

    constructor(props) {
        super(props);

        this.state = { chkPlayers: false, chkEvents: false, selectedChars: "", selectedPlaystyle: "", selectedRadius: "",
        selectedVenueFee: "", selectedPotBonus: "", selectedOnlineSignup: ""  }
        this.togglePlayersFilter = this.togglePlayersFilter.bind(this);
        this.toggleEventsFilter = this.toggleEventsFilter.bind(this);

        this.charFilterChange = this.charFilterChange.bind(this);
        this.playFilterChange = this.playFilterChange.bind(this);
        this.radiusFilterChange = this.radiusFilterChange.bind(this);

        this.venueFeeFilterChange = this.venueFeeFilterChange.bind(this);
        this.potBonusFilterChange = this.potBonusFilterChange.bind(this);
        this.OnlineSignupFilterChange = this.OnlineSignupFilterChange.bind(this);

        this.characters = filterOptions.characters;
        this.playstyles = filterOptions.playstyle;
        this.radius = filterOptions.radius;

        this.venueFee = filterOptions.venueFee;
        this.potBonus = filterOptions.potBonus;
        this.onlineSignup = filterOptions.onlineSignup;
    }

    togglePlayersFilter() {
        const pl = this.state.chkPlayers;
        this.setState({ chkPlayers: !pl });
    }

    toggleEventsFilter() {
        const ev = this.state.chkEvents;
        this.setState({ chkEvents: !ev })
    }

    charFilterChange(selectedChars) {
        this.setState({ selectedChars });
        // selectedOption can be null when the `x` (close) button is clicked
        if (selectedChars) {
            console.log(selectedChars);

        }
    }

    playFilterChange(selectedPlaystyle) {
        this.setState({ selectedPlaystyle });
        if (selectedPlaystyle) {
            console.log(this.state.selectedPlaystyle);
        }
    }

    radiusFilterChange(selectedRadius) {
        this.setState({ selectedRadius });
        if (selectedRadius) {
            console.log(selectedRadius);
        }
    }

    venueFeeFilterChange(selectedVenueFee) {
        this.setState({ selectedVenueFee });
        // selectedOption can be null when the `x` (close) button is clicked
        if (selectedVenueFee) {
            console.log(selectedVenueFee);

        }
    }

    potBonusFilterChange(selectedPotBonus) {
        this.setState({ selectedPotBonus });
        if (selectedPotBonus) {
            console.log(this.state.selectedPotBonus);
        }
    }

    OnlineSignupFilterChange(selectedOnlineSignup) {
        this.setState({ selectedOnlineSignup });
        if (selectedOnlineSignup) {
            console.log(selectedOnlineSignup);
        }
    }

    render() {
        const selectedChars = this.state.selectedChars;
        const selectedPlaystyle = this.state.selectedPlaystyle;
        const selectedRadius = this.state.selectedRadius;

        const selectedVenueFee = this.state.selectedVenueFee;
        const selectedPotBonus = this.state.selectedPotBonus;
        const selectedOnlineSignup = this.state.selectedOnlineSignup;

        return (
            <div className="content-smashmap">

                <div className="filter">
                    <div className="filter-search">
                        <div className="search-icon-wrapper">
                            <img src={search} className="search-icon" />
                        </div>
                        <input className="map-search" type="text" placeholder="e.g. Woodstock" />
                    </div>
                    <div className="filter-players">
                        <div className="players-filter-toggle" onClick={this.togglePlayersFilter}>
                            Players
                            <img src={chevron} className={this.state.chkPlayers ? 'filter-chevron-active' : 'filter-chevron'} />
                        </div>
                        <div className={this.state.chkPlayers ? 'filter-options-items-wrapper-shown' : 'filter-options-items-wrapper'}  >
                            <div className={this.state.chkPlayers ? 'filter-options-item-shown' : 'filter-options-item'}>

                                <Select
                                    className="character-select"
                                    placeholder="Characters"
                                    closeOnSelect={false}
                                    onChange={this.charFilterChange}
                                    options={this.characters}
                                    labelKey={"charName"}
                                    valueKey={"charId"}
                                    multi={true}
                                    removeSelected={true}
                                    value={selectedChars}
                                />
                            </div>
                            <div className={this.state.chkPlayers ? 'filter-options-item-shown' : 'filter-options-item'}>

                                <Select
                                    className="playstyle-select"
                                    placeholder="Playstyle"
                                    closeOnSelect={false}
                                    onChange={this.playFilterChange}
                                    options={this.playstyles}
                                    labelKey={"playName"}
                                    valueKey={"playId"}
                                    multi={true}
                                    removeSelected={true}
                                    value={selectedPlaystyle}
                                />
                            </div>
                            <div className={this.state.chkPlayers ? 'filter-options-item-shown' : 'filter-options-item'}>

                                <Select
                                    className="radius-select"
                                    placeholder="Radius (Miles)"
                                    onChange={this.radiusFilterChange}
                                    options={this.radius}
                                    value={selectedRadius}
                                    labelKey={"label"}
                                    valueKey={"value"}
                                />
                            </div>
                            <div id='more-filters-box' className={this.state.chkPlayers ? 'filter-options-item-shown' : 'filter-options-item'}>
                                <div className="more-filters">
                                    More Filters
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="filter-events">
                        <div className="events-filter-toggle" onClick={this.toggleEventsFilter}>
                            Events
                            <img src={chevron} className={this.state.chkEvents ? 'filter-chevron-active' : 'filter-chevron'} />
                        </div>
                        <div className={this.state.chkEvents ? 'filter-options-items-wrapper-shown' : 'filter-options-items-wrapper'}  >
                            <div className={this.state.chkEvents ? 'filter-options-item-shown' : 'filter-options-item'}>
                                <Select
                                    className="venuefee-select"
                                    placeholder="Venue Fee?"
                                    onChange={this.venueFeeFilterChange}
                                    options={this.venueFee}
                                    value={selectedVenueFee}
                                />
                            </div>
                            <div className={this.state.chkEvents ? 'filter-options-item-shown' : 'filter-options-item'}>
                                <Select
                                    className="potbonus-select"
                                    placeholder="Pot Bonus?"
                                    onChange={this.potBonusFilterChange}
                                    options={this.potBonus}
                                    value={selectedPotBonus}
                                />                            
                            </div>
                            <div className={this.state.chkEvents ? 'filter-options-item-shown' : 'filter-options-item'}>


                                <Select
                                    className="onlinesignup-select"
                                    placeholder="Online Signup?"
                                    onChange={this.OnlineSignupFilterChange}
                                    options={this.onlineSignup}
                                    value={selectedOnlineSignup}
                                />
                            </div>
                            <div className={this.state.chkEvents ? 'filter-options-item-shown' : 'filter-options-item'}>

                                <div className="more-filters">
                                    More Filters
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="googlemap">
                    <MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbJ0YYtlkCgbL6faPQSUv5U9BpVtqNaUg&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
                        containerElement={<div style={{ height: `100%`, flex: "1" }} />}
                        mapElement={<div style={{ height: `100%`, flex: "1" }} />}
                    />
                </div>
            </div>
        )
    }
}



export default smashmap;