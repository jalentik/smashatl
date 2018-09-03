import React, { Component } from "react";
function EventsList(props) {
    const items = props.events;
    const listItems = items.map((item) =>
        <a href={item.link}>
            <li className="events-list-item">
                <img src={item.img} alt='' />
                <h1>{item.title}</h1>
                <h2>{item.alt}</h2>
            </li>
        </a>
    );
    return (

        <ul className="events-list">
            {listItems}
        </ul>

    )

}
const datasource = []

class event extends Component {
    componentDidMount(){
        document.title = "Events";

    }
    render() {
        return (
            <div className="events-content">
                <EventsList events={datasource} />
            </div>
        )
    }
}

export default event;