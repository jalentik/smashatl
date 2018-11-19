import React, { Component, createRef } from "react";
import filterOptions from "./filterOptions";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './smashmap.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Circle } from "react-google-maps";
import fb from '../../Media/fb.png';
import twit from '../../Media/twit.png';
import twtch from '../../Media/twitch.png';
import iUser from '../../Media/user.png';
import msg from '../../Media/mail.png';
import vid from '../../Media/video-player.png';
import report from '../../Media/warning.png';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import PropTypes from 'prop-types';
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
var reload = require('../../Media/reload.svg')
var clear = require('../../Media/clear-button.svg')

const GAMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDbJ0YYtlkCgbL6faPQSUv5U9BpVtqNaUg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div className={"googlemap-container"} />,
        mapElement: <div className={"googlemap-element"} />,
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
                    console.log(this.props)
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
                onRadiusChanged: () => {
                    if (this.props.mapUsers) {
                        var usersInBounds = [];
                        this.props.mapUsers.forEach(user => {
                            console.log({ lat: parseInt(user.lat), lng: parseInt(user.lng) })
                            var dist = google.maps.geometry.spherical.computeDistanceBetween({ lat: parseInt(user.lat), lng: parseInt(user.lng) }, this.state.center);
                            if (dist <= this.props.radius) {
                                var x = dist / 1609.34;
                                user.dist = x.toFixed(0) + " miles";
                                usersInBounds.push(user)

                            }
                        });

                        this.setState({ usersInBounds: usersInBounds })
                    }
                }
            })
        },
        componentWillReceiveProps(nextProps) {
            this.forceUpdate();

        }
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <BrowserView>
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
                        placeholder="Enter a location"
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
                    onRadiusChanged={props.onRadiusChanged}
                    options={{ strokeColor: "#a8c0fc", fillColor: "#D9E9FF", fillOpacity: 0.2, strokeOpacity: 1 }}

                />

            </GoogleMap>
            <div style={{ height: '500px', }}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflowY: 'scroll', maxHeight: '500px' }}>
                    {props.usersInBounds.map((user) => {
                        return (
                            <div key={user.AppUserDetail.UserId} className="player-card">
                                <div className="player-card-title justify-space-between">
                                    <div>
                                        <p>{user.AppUserDetail.Tag}</p>
                                    </div>
                                    <div className="flex-row justify-evenly">
                                        <a hidden={!user.AppUserDetail.FacebookUrl} href={user.AppUserDetail.FacebookUrl} target="_blank"><img src={fb} style={{ cursor: "pointer" }} className='social-image small' /></a>
                                        <a hidden={!user.AppUserDetail.TwitterUrl} href={user.AppUserDetail.TwitterUrl} target="_blank"><img src={twit} style={{ cursor: "pointer" }} className='social-image small' /></a>
                                        <a hidden={!user.AppUserDetail.TwitchUrl} href={user.AppUserDetail.TwitchUrl} target="_blank"><img src={twtch} style={{ cursor: "pointer" }} className='social-image small' /></a>
                                    </div>
                                </div>
                                <div className="player-card-body">
                                    <div className="player-card-body-column" style={{ justifyContent: 'center' }}>
                                        <p > {user.AppPlaystyle ? user.AppPlaystyle.StyleName : ""} </p>
                                    </div>

                                    <div style={{ alignContent: "center", justifyContent: "space-evenly" }} className="player-card-body-column">
                                        <img hidden={!user.AppCharacter} style={{ height: "35px", width: "35px", margin: "0 auto" }} src={user.AppCharacter ? require("../../Media/Icons/" + props.filterOptions.characters[user.AppCharacter.CharacterId - 1].thumbnail) : ""} />
                                        <p className="small main">{user.AppCharacter ? user.AppCharacter.CharacterName : ""}</p>
                                        <img hidden={!user.AppCharacter1} style={{ height: "35px", width: "35px", margin: "0 auto", marginTop: "10px", marginBottom: "-10px" }} src={user.AppCharacter1 ? require("../../Media/Icons/" + props.filterOptions.characters[user.AppCharacter1.CharacterId - 1].thumbnail) : ""} />
                                        <p className="small secondary">{user.AppCharacter1 ? user.AppCharacter1.CharacterName : ""}</p>
                                    </div>

                                    <div className="player-card-body-column justify-space-evenly">
                                        <p> </p>
                                        <a href="#"><img src={vid} />Media</a>
                                        <a href="#"><img src={msg} />Message</a>
                                        <a href="#"><img src={iUser} />Profile</a>
                                        <a href="#"><img src={report} />Report</a>

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
        </BrowserView>
        <MobileView viewClassName="mobile-google-map">
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

                <GoogleMap
                    ref={props.onMapMounted}
                    defaultZoom={8}
                    center={props.center}
                    onIdle={props.onIdle}
                    defaultOptions={{
                        streetViewControl: false,
                        scaleControl: false,
                        mapTypeControl: false,
                        panControl: false,
                        zoomControl: false,
                        rotateControl: false,
                        fullscreenControl: false
                    }}
                >
                    <SearchBox
                        ref={props.onSearchBoxMounted}
                        bounds={props.bounds}
                        controlPosition={google.maps.ControlPosition.BOTTOM_CENTER}
                        onPlacesChanged={props.onPlacesChanged}

                    >
                        <input
                            type="text"
                            placeholder="Enter a location"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                marginBottom: '25px'
                            }}
                        />
                    </SearchBox>
                    <Circle center={props.center} radius={props.radius}
                        ref={props.onCircleMounted}
                        onRadiusChanged={props.onRadiusChanged}
                        options={{ strokeColor: "#a8c0fc", fillColor: "#D9E9FF", fillOpacity: 0.2, strokeOpacity: 1 }}

                    />

                </GoogleMap>
                <div style={{ overflowY: 'auto'}}>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflowY: 'auto', maxHeight: '500px' }}>
                        <TransitionGroup className="player-card-list">
                            {props.usersInBounds.map((user) => {
                                return (
                                    <CSSTransition
                                        key={user.AppUserDetail.UserId}
                                        timeout={500}
                                        classNames="card-item"
                                    >
                                    
                                        <div className="player-card">
                                            <div className="player-card-title">
                                                <div>
                                                    <p>{user.AppUserDetail.Tag}</p>
                                                </div>
                                                <div className="flex-row justify-evenly">
                                                    <a hidden={!user.AppUserDetail.FacebookUrl} href={user.AppUserDetail.FacebookUrl} target="_blank"><img src={fb} style={{ cursor: "pointer" }} className='social-image extra-small' /></a>
                                                    <a hidden={!user.AppUserDetail.TwitterUrl} href={user.AppUserDetail.TwitterUrl} target="_blank"><img src={twit} style={{ cursor: "pointer" }} className='social-image extra-small' /></a>
                                                    <a hidden={!user.AppUserDetail.TwitchUrl} href={user.AppUserDetail.TwitchUrl} target="_blank"><img src={twtch} style={{ cursor: "pointer" }} className='social-image extra-small' /></a>
                                                </div>
                                            </div>
                                            <div className="player-card-body">
                                                <div className="flex-column justify-evenly" style={{ width: '60%' }}>
                                                    <div className="player-card-body-column" style={{ justifyContent: 'center' }}>
                                                        <p > {user.AppPlaystyle ? user.AppPlaystyle.StyleName : ""} </p>
                                                    </div>

                                                    <div style={{ alignContent: "center", justifyContent: "space-evenly", paddingBottom: '10px' }} className="player-card-body-column">
                                                        <img hidden={!user.AppCharacter} style={{ height: "30px", width: "30px" }} src={user.AppCharacter ? require("../../Media/Icons/" + props.filterOptions.characters[user.AppCharacter.CharacterId - 1].thumbnail) : ""} />
                                                        <img hidden={!user.AppCharacter1} style={{ height: "30px", width: "30px" }} src={user.AppCharacter1 ? require("../../Media/Icons/" + props.filterOptions.characters[user.AppCharacter1.CharacterId - 1].thumbnail) : ""} />
                                                    </div>
                                                </div>
                                                <div className="player-card-body-column justify-center" style={{ paddingTop: '5px', borderLeft: '1px solid #ddd' }}>
                                                <a className="action-box player-card-body-column justify-space-evenly" onClick={function(){alert('This action is not available right now.')}}>
                                                    <div className="flex-column">
                                                        <img src={vid} />
                                                        <img src={msg} />

                                                    </div>
                                                    <div className="flex-column">
                                                        <img src={iUser} />
                                                        <img src={report} />

                                                    </div>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>
                                    </CSSTransition>
                                )
                            })}
                        </TransitionGroup>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </MobileView>
    </div>
);
class DropdownOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

    }


    handleMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    };
    handleMouseEnter(event) {
        this.props.onFocus(this.props.option, event);
    };
    handleMouseMove(event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    };
    render() {
        return (
            <div className={this.props.className}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                title={this.props.option.title}>

                {this.props.children}
            </div>
        );
    }
}

DropdownOptions.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
}

class smashmap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chkPlayers: false, selectedChars: "", selectedPlaystyle: "", selectedRadius: 32186.9,
            selectedEvents: false, mapUsers: [], mapUsersResults: [], Circle: {},
            searchQuery: "", centerPosition: { lat: 33.7490, lng: -84.3880 }, showFilter: false
        }
        this.togglePlayersFilter = this.togglePlayersFilter.bind(this);
        this.toggleEventsFilter = this.toggleEventsFilter.bind(this);

        this.charFilterChange = this.charFilterChange.bind(this);
        this.playFilterChange = this.playFilterChange.bind(this);
        this.radiusFilterChange = this.radiusFilterChange.bind(this);


        this.characters = filterOptions.characters;
        this.playstyles = filterOptions.playstyle;
        this.radius = filterOptions.radius;

        this.clearFilters = this.clearFilters.bind(this);
        this.refreshUsers = this.refreshUsers.bind(this);
        this.filterUsers = this.filterUsers.bind(this);

        this.toggleFilterModal = this.toggleFilterModal.bind(this);
        this.optionRenderer = this.optionRenderer.bind(this);

    }
    optionRenderer(option) {
        return (
            <div style={{ height: "40px", display: "flex", width: "100%", flexDirection: "row", alignItems: "center" }}>
                <img style={{ height: "35px", width: "35px" }} src={require("../../Media/Icons/" + option.thumbnail)} />
                <p style={{ fontFamily: "Quicksand, sans-serif", fontWeight: "500", color: "#3d3d3d", marginLeft: "20px" }}>{option.charName}</p>
            </div>
        )
    }
    fetchUsers() {
        var list = [];
        fetch("http://smashatlapi-dev.us-east-2.elasticbeanstalk.com/api/appusers/getappusers")
            .then(results => {
                if (!results.ok) {
                    throw new Error("Something went wrong.")
                }
                else {
                    return results.json();
                }
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
                this.setState({ mapUsers: dataLocs }, this.filterUsers)

            })
            .catch(error => console.log(error))
    }
    refreshUsers() {
        this.fetchUsers();
    }
    clearFilters() {
        this.setState({
            chkPlayers: false, selectedChars: "", selectedPlaystyle: "", selectedRadius: 32186.9,
            selectedEvents: false,
            searchQuery: ""
        }, this.filterUsers)
    }
    componentDidMount() {
        document.title = "SmashMap";
        this.fetchUsers();



    }
    filterUsers() {
        var list = [];
        if (!this.state.selectedPlaystyle && !this.state.selectedChars) {
            this.setState({ mapUsersResults: this.state.mapUsers })
        } else {
            this.state.mapUsers.forEach(c => {
                var match = false;
                if (this.state.selectedChars)
                    this.state.selectedChars.forEach(f => {
                        if (c.MainId === f.charId) match = true;
                        if (c.SecondaryId === f.charId) match = true;
                    })

                if (this.state.selectedPlaystyle)
                    this.state.selectedPlaystyle.forEach(f => {
                        if (c.StyleId === f.playId) match = true;
                    })

                if (match) list.push(c);
            })
            this.setState({ mapUsersResults: list }, function () { this.forceUpdate() });
        }


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
        this.setState({ selectedChars }, this.filterUsers);

    }

    playFilterChange(selectedPlaystyle) {
        this.setState({ selectedPlaystyle }, this.filterUsers);

    }

    radiusFilterChange(selectedRadius) {
        this.setState({ selectedRadius: selectedRadius.radiusVal }, this.filterUsers)
    }
    toggleFilterModal() {
        this.setState({ showFilter: !this.state.showFilter })


    }

    render() {
        const selectedChars = this.state.selectedChars;
        const selectedPlaystyle = this.state.selectedPlaystyle;
        const selectedRadius = this.state.selectedRadius;
        const selectedEvents = this.state.selectedEvents;
        const mapUsersResults = this.state.mapUsersResults;

        const centerPosition = this.state.defaultCenter;
        const showFilter = this.state.showFilter;
        return (
            <div className="content-smashmap">
                <BrowserView>
                    <div className="filter">

                        <div className="filter-players">
                            <div className="action-container">
                                <a onClick={this.refreshUsers} className="refresh-users">
                                    <img src={reload}></img>
                                </a>
                                <a onClick={this.clearFilters} className="clear-filter">
                                    <img src={clear}></img>
                                </a>
                            </div>
                            <div className="players-filter-toggle" onClick={this.togglePlayersFilter}>
                                Players
                            <img src={chevron} className={this.state.chkPlayers ? 'filter-chevron-active' : 'filter-chevron'} />
                            </div>
                            <div className={this.state.chkPlayers ? 'filter-options-items-wrapper-shown' : 'filter-options-items-wrapper'}  >
                                <div className={this.state.chkPlayers ? 'filter-options-item-shown' : 'filter-options-item'}>

                                    <Select
                                        optionComponent={DropdownOptions}
                                        optionRenderer={this.optionRenderer}
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
                                <div hidden id='more-filters-box' className={this.state.chkPlayers ? 'filter-options-item-shown' : 'filter-options-item'}>
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
                </BrowserView>
                <MobileView>
                    <CSSTransition
                        in={showFilter}
                        timeout={300}
                        classNames="filter-window"
                        unmountOnExit

                        onExited={() => {
                        }}
                    >
                        {state => (
                            <div className="filter-window">
                                <div key="filter" onClick={this.toggleFilterModal} id="filter-modal" className="modal-background">
                                    <div className="modal filter-modal">
                                        <div className="filter-container">
                                            <h2> Filter Players </h2>
                                            <div className="filter-item-group">
                                                <p>Characters: </p>
                                                <Select
                                                    optionComponent={DropdownOptions}
                                                    optionRenderer={this.optionRenderer}
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
                                            <div className="filter-item-group">
                                                <p>Playstyle: </p>
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
                                            <div className="filter-item-group">
                                                <p>Radius: </p>
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
                                        </div>
                                        <div className="filter-actions">
                                            <a href="#" className="btn btn-success btn-lg filter-go" onClick={this.filterUsers}><i className="fa fa-filter"></i><p> Filter</p></a>
                                            <a href="#" className="btn btn-primary btn-lg" onClick={this.clearFilters}><i className="fa fa-times"></i> <p>Clear</p></a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CSSTransition>
                    <div className="googlemap">
                        <div className="mobile-map-filter">
                            <a className="btn btn-filter" href="#" onClick={this.toggleFilterModal}><i className="fa fa-filter"></i>FILTER</a>

                        </div>

                        <GAMap
                            mapUsers={mapUsersResults}
                            defaultCenter={centerPosition}
                            radius={selectedRadius}
                            filterOptions={filterOptions}
                        >


                        </GAMap>


                    </div>

                </MobileView>


            </div>

        )
    }
}



export default smashmap;