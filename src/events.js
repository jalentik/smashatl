import React, { Component } from "react";
import typo from './typohouse.png';
import nvm from './nevermore.jpg';

function EventsList(props) {
    const items = props.events;
    const listItems = items.map((item) =>
        <a href={item.link}>
            <li className="events-list-item">
                <img src={require('' +item.img)} alt='' />
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
const datasource = [
    { img: './typohouse.png', title: "Typo House Macon", alt: "Hosted by Typo House Games", date: "July 3rd", location: "4437 Columbus Rd Suit 102, Macon, GA 31206", link: "https://www.facebook.com/events/231830774068344/" },
    { img: './nevermore.jpg', title: "Nevermore", alt: "$50 Pot Bonus - Hosted by Justin Harvey", date: "July 14th", location: "688 Whitlock Ave NW, Marietta, GA 30064-3152, United States", link: "https://www.facebook.com/events/1662840307088196/" },
    { img: './ssmash.jpg', title: "Summer Smash at Cardboard Castle", alt: "($50 Pot Bonus) - Hosted by Rafael Cumbermack", date: "July 18th", location: "4015 Columbia Rd, Augusta, Georgia 30907", link: "https://www.facebook.com/events/385766768612458/" },
    { img: './gb.jpg', title: "Gwinnett Brawl", alt: "Hosted by GB League", date: "July 28th", location: "3700 Satellite Blvd, Ste 7B, Duluth, Georgia 30096", link: "https://www.facebook.com/events/1738378982919039/" }
]

class event extends Component {
    render() {
        return (
            <div className="events-content">
                <EventsList events={datasource} />
            </div>
        )
    }
}

export default event;