import React, {Component} from 'react';

export default class extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    </button>
                <a className="navbar-brand clearfix" href="/"><span className="glyphicon glyphicon-map-marker"></span><span>Trip Planner</span></a>
                </div>
                <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li className="active"><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                </div>
            </div>
        )
    }
}