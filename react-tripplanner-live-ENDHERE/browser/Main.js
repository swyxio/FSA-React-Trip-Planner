'use strict';

import React, {Component} from 'react'
import Navbar from './Navbar'
import Map from './Map'
import Panel from './Panel'
const attractions = require("./attractions");
const buildMarker = require("./marker");

export default class extends Component {
    constructor() {
        super()
        this.state = {
          hotels: [],
          restaurants: [],
          activities: []
        }
        this.addFunc = this.addFunc.bind(this)
        this.delFunc = this.delFunc.bind(this)
    }
    addFunc(attractionType) {
        const selectedId = document.getElementById(attractionType + '-choices').value
        const selectedAttraction = attractions.find(attractionType, selectedId);
        const newMarker = buildMarker(attractionType, selectedAttraction.place.location)
        newMarker.addTo(this.map)
        selectedAttraction.marker = newMarker
        let newstate = Object.assign({}, this.state)
        newstate[attractionType].push(selectedAttraction)
        this.setState(newstate)
        this.map.flyTo({ center: selectedAttraction.place.location, zoom: 15 });
    }
    delFunc(attractionType, id) {
        let newstate = Object.assign({}, this.state)
        newstate[attractionType] = newstate[attractionType].filter(x => {
            if (x.id != id) return true
            else x.marker.remove()
            return false
        })
        this.setState(newstate)
    }
    render() {
        return (<div>
                    <Navbar />
                    <div id="app" className="clearfix">
                        <Map ref={(x) => !x ? '' : this.map = x.map}/>
                        <Panel selections={this.state} addFunc={this.addFunc} delFunc={this.delFunc}/>
                    </div>
                </div>)
    }
}