import React, {Component} from 'react';
const attractions = require("./attractions");

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        attractions.load().then(list => this.setState(list))
    }
    render() {
        let makeOptions = type => !this.state[type] ? '' 
                            : this.state[type].map((place, i) =>
                                <option value={place.id} key={i}>{place.name}</option>
                            )
        let makeLi = type => !this.props.selections[type] ? '' 
                            : this.props.selections[type].map((place, i) =>
                                <li value={place.id} key={i} className="itinerary-item">
                                    {place.name}
                                    <button className="btn btn-xs btn-danger remove btn-circle" onClick={()=>this.props.delFunc(type, place.id)}>x</button>
                                </li>
                            )
        return (
            <div id="control-panel" className="col-sm-4 col-lg-3 clearfix">
                <div className="col-xs-6 col-sm-12">
                    <div className="panel panel-default">
                    <div className="panel-body" id="options-panel">
                        <div>
                        <h4>Hotels</h4>
                        <select id="hotels-choices">
                            {makeOptions('hotels')}
                        </select>
                        <button id="hotels-add" className="btn btn-primary btn-circle pull-right" onClick={()=>this.props.addFunc('hotels')}>+</button>
                        </div>
                        <div>
                        <h4>Restaurants</h4>
                        <select id="restaurants-choices">
                            {makeOptions('restaurants')}
                        </select>
                        <button id="restaurants-add" className="btn btn-primary btn-circle pull-right" onClick={()=>this.props.addFunc('restaurants')}>+</button>
                        </div>
                        <div>
                        <h4>Activities</h4>
                        <select id="activities-choices">
                            {makeOptions('activities')}
                        </select>
                        <button id="activities-add" className="btn btn-primary btn-circle pull-right" onClick={()=>this.props.addFunc('activities')}>+</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-12">

                    <div className="panel panel-default">

                    <div className="panel-body" id="itinerary">
                        <div>
                        <h4>My Hotel</h4>
                        <ul className="list-group" id="hotels-list">
                            {makeLi('hotels')}
                        </ul>
                        </div>
                        <div>
                        <h4>My Restaurants</h4>
                        <ul className="list-group" id="restaurants-list">
                            {makeLi('restaurants')}
                        </ul>
                        </div>
                        <div>
                        <h4>My Activities</h4>
                        <ul className="list-group" id="activities-list">
                            {makeLi('activities')}
                        </ul>
                        </div>
                    </div>

                    </div>
                </div>
                </div>
        )
    }
}