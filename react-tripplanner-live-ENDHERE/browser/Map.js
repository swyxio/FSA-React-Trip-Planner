import React, {Component} from 'react';
const mapboxgl = require("mapbox-gl");
mapboxgl.accessToken = "pk.eyJ1IjoiY2Fzc2lvemVuIiwiYSI6ImNqNjZydGl5dDJmOWUzM3A4dGQyNnN1ZnAifQ.0ZIRDup0jnyUFVzUa_5d1g";

export default class extends Component {
    constructor() {
        super()
    }
    componentDidMount(){
        this.map = new mapboxgl.Map({
            container: "map-canvas",
            center: [-74.0, 40.731],
            zoom: 12.3, // starting zoom
            pitch: 35,
            bearing: 20,
            style: "mapbox://styles/mapbox/streets-v10"
        });
    }
    
    render() {
        return (
            <div className="map-container col-sm-8 col-lg-9">
                <div>
                    <div id="map-canvas"></div>
                </div>
            </div>
        )
    }
}