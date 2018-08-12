import React, { Component, createRef } from "react";
import filterOptions from "./filterOptions";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import './smashmap.css'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Circle } from "react-google-maps";
import fb from '../../Media/fb.png';
import twit from '../../Media/twit.png';
import twtch from '../../Media/twitch.png';
/* eslint-disable no-undef */
/* global google */
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const google = window.google;

var search = require('../../Media/search.png');
var chevron = require('../../Media/chevron.png');
var check = require('../../Media/check-symbol.png')
var emptyCheck = require('../../Media/check-box-empty.png')

const GAMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDbJ0YYtlkCgbL6faPQSUv5U9BpVtqNaUg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px`, display: 'flex', flexDirection: 'row', flex: 1, transition: 'all ease-in-out 1s' }} />,
        mapElement: <div style={{ height: `100%`, minWidth: `500px`, maxWidth: '700px', transition: 'all ease-in-out 1s', }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                center: {
                    lat: 33.7490, lng: -84.3880
                },
                usersInBounds: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onIdle: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                    if (this.props.mapUsers) {
                        var usersInBounds = [];
                        this.props.mapUsers.forEach(user => {
                            var dist = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(user.lat, user.lng), this.state.center);
                            if (dist <= this.props.radius) {
                                var x = dist / 1609.34;
                                user.dist = x.toFixed(0) + " miles";
                                usersInBounds.push(user)

                            }
                        });

                        this.setState({ usersInBounds: usersInBounds })
                    }
                },
                onCircleMounted: ref => {
                    refs.circle = ref;
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    refs.map.fitBounds(refs.circle.getBounds());
                },
                OnCenterChanged: () => {
                    alert('test')
                }
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={8}
            center={props.center}
            onIdle={props.onIdle}
        >
            <SearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={props.onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Customized your placeholder"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        marginTop: `27px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                    }}
                />
            </SearchBox>
            <Circle center={props.center} radius={props.radius}
                ref={props.onCircleMounted}
                onCenterChanged={props.onCenterChanged}
                options={{ strokeColor: "#a8c0fc", fillColor: "#D9E9FF", fillOpacity: 0.2, strokeOpacity: 1 }}

            />

        </GoogleMap>
        <div style={{height:'500px',}}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflowY: 'scroll', maxHeight: '500px' }}>
                {props.usersInBounds.map((user) => {
                    return (
                        <div key={user.AppUserDetail.UserId} className="player-card">
                            <div className="player-card-title justify-space-between">
                                <div>
                                    <p>{user.AppUserDetail.Tag}</p>
                                </div>
                                <div className="flex-row justify-evenly">
                                    <img src={fb} className='social-image small' />
                                    <img src={twit} className='social-image small' />
                                    <img src={twtch} className='social-image small' />
                                </div>
                            </div>
                            <div className="player-card-body">
                                <div className="player-card-body-column" style={{ justifyContent: 'center' }}>
                                    <p > {user.AppPlaystyle.StyleName} </p>
                                </div>

                                <div className="player-card-body-column justify-space-evenly">
                                    <p className="main">{user.AppCharacter.CharacterName}</p>
                                    <p className="secondary">{user.AppCharacter1.CharacterName}</p>
                                </div>

                                <div className="player-card-body-column">
                                    <p>Friends: </p>
                                    <a href="#">Media</a>
                                </div>
                            </div>
                            <div className="player-card-footer">
                                <p>~{user.dist}</p>
                            </div>
                        </div>
                    )
                })}
                <div>

                </div>
            </div>
        </div>
    </div>
);

class smashmap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chkPlayers: false, selectedChars: "", selectedPlaystyle: "", selectedRadius: 32186.9,
            selectedEvents: false, mapUsers: [], Circle: {},
            searchQuery: "", centerPosition: { lat: 33.7490, lng: -84.3880 }
        }
        this.togglePlayersFilter = this.togglePlayersFilter.bind(this);
        this.toggleEventsFilter = this.toggleEventsFilter.bind(this);

        this.charFilterChange = this.charFilterChange.bind(this);
        this.playFilterChange = this.playFilterChange.bind(this);
        this.radiusFilterChange = this.radiusFilterChange.bind(this);


        this.characters = filterOptions.characters;
        this.playstyles = filterOptions.playstyle;
        this.radius = filterOptions.radius;
    }

    componentDidMount() {
        var list = [];
        fetch("http://smashatlapi-dev.us-east-2.elasticbeanstalk.com/api/appusers")
            .then(results => {
                return results.json();
            })
            .then(dataLocs => {
                dataLocs.forEach((dloc) => {
                    var dlStr = dloc.AppLocation.LatLng;
                    var str = dlStr.split(',');
                    var lat = str[0];
                    var lng = str[1];
                    dloc.lat = lat;
                    dloc.lng = lng;
                })
                this.setState({ mapUsers: dataLocs })
            })
    }

    togglePlayersFilter() {
        const pl = this.state.chkPlayers;
        this.setState({ chkPlayers: !pl });
    }

    toggleEventsFilter() {
        const ev = this.state.selectedEvents;
        this.setState({ selectedEvents: !ev })
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
        this.setState({ selectedRadius: selectedRadius.radiusVal })
    }


    render() {
        const selectedChars = this.state.selectedChars;
        const selectedPlaystyle = this.state.selectedPlaystyle;
        const selectedRadius = this.state.selectedRadius;
        const selectedEvents = this.state.selectedEvents;
        const mapUsers = this.state.mapUsers;

        const centerPosition = this.state.defaultCenter;
        return (
            <div className="content-smashmap">

                <div className="filter">

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
                                    labelKey={"text"}
                                    valueKey={"radiusVal"}

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
                        <div className="events-filter-toggle" >
                            Events
                            <div className="chk-events-wrapper" onClick={this.toggleEventsFilter}>
                                <img src={selectedEvents ? check : emptyCheck} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="googlemap">
                    <GAMap
                        mapUsers={mapUsers}
                        defaultCenter={centerPosition}
                        radius={selectedRadius}
                    >
                    </GAMap>


                </div>

            </div>

        )
    }
}



export default smashmap;