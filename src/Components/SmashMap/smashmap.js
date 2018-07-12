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

        this.state = { chkPlayers: false, chkEvents: false, selectedChars:null, selectedPlaystyle:null, selectedRadius:10 }
        this.togglePlayersFilter = this.togglePlayersFilter.bind(this);
        this.toggleEventsFilter = this.toggleEventsFilter.bind(this);
        this.charFilterChange = this.charFilterChange.bind(this);

        this.characters = filterOptions.characters;
    }

    togglePlayersFilter() {
        const pl = this.state.chkPlayers;
        this.setState({ chkPlayers: !pl });
    }

    toggleEventsFilter() {
        const ev = this.state.chkEvents;
        this.setState({ chkEvents: !ev })
    }

    charFilterChange(selectedChars){
        this.setState({ selectedChars });
        // selectedOption can be null when the `x` (close) button is clicked
        if (selectedChars) {
          console.log(selectedChars);
        }
    }

    playFilterChange(selectedPlaystyle){
        this.setState({ selectedPlaystyle });
        if (selectedPlaystyle) {
            console.log(selectedPlaystyle);
          }
    }

    radiusFilterChange(selectedRadius){
        this.setState({ selectedRadius });
        if (selectedRadius) {
            console.log(selectedRadius);
          }
    }

    render() {
        const selectedChars = this.state.selectedChars;
        const selectedPlaystyle = this.state.selectedPlaystyle;
        const selectedRadius = this.state.selectedRadius;

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
                        <a href="#" onClick={this.togglePlayersFilter}>
                            Players
                            <img src={chevron} className={this.state.chkPlayers ? 'filter-chevron-active' : 'filter-chevron'} />
                        </a>
                        <div id="select-filter-wrapper" className={this.state.chkPlayers ? 'filter-options-items-wrapper-shown' : 'filter-options-items-wrapper'}  >
                            <div  className={this.state.chkPlayers ? '.select-wrapper filter-options-item-shown' : 'filter-options-item'}>
                                <Select
                                    className="character-select"
                                    name="character-select"
                                    placeholder="Characters"
                                    closeOnSelect={false}
                                    onChange={this.charFilterChange}
                                    options={filterOptions.characters}
                                    labelKey={"charName"}
                                    valueKey={"charId"}
                                    multi
                                    removeSelected
                                    value={selectedChars}
                                />
                            </div>

                            <div className={this.state.chkPlayers ? '.select-wrapper filter-options-item-shown' : 'filter-options-item'}>
                            <Select
                                    className="playstyle-select"
                                    name="playstyle-select"
                                    placeholder="Playstyle"
                                    closeOnSelect={false}
                                    onChange={this.playFilterChange}
                                    options={filterOptions.playstyle}
                                    labelKey={"styleName"}
                                    valueKey={"playId"}
                                    multi
                                    removeSelected
                                    value={selectedPlaystyle}
                                />
                            </div>
                            <div className={this.state.chkPlayers ? '.select-wrapper filter-options-item-shown' : 'filter-options-item'}>
                            <Select
                                    className="radius-select"
                                    name="radius-select"
                                    placeholder=""
                                    onChange={this.radiusFilterChange}
                                    options={filterOptions.radius}
                                    simpleValue
                                    value={selectedRadius}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="filter-events">
                        <a href="#" onClick={this.toggleEventsFilter}>
                            Events
                            <img src={chevron} className={this.state.chkEvents ? 'filter-chevron-active' : 'filter-chevron'} />
                        </a>
                        <div className={this.state.chkEvents ? 'filter-options-items-wrapper-shown' : 'filter-options-items-wrapper'}  >
                            <div className={this.state.chkEvents ? 'filter-options-item-shown' : 'filter-options-item'}>
                                Characters
                            </div>
                            <div className={this.state.chkEvents ? 'filter-options-item-shown' : 'filter-options-item'}>
                                Activity
                            </div>
                            <div className={this.state.chkEvents ? 'filter-options-item-shown' : 'filter-options-item'}>
                                Rank
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