import React, { Component } from 'react';
import { Circle } from 'react-leaflet';



class Evacuation_Element extends React.Component {

    // props = type, coordinates
    constructor(props) {
        super(props)
    }

    render() {
        <div>
            <Circle center={this.props.coordinates} fillColor="blue" radius={20} />
        </div>
    }
}

export default Evacuation_Element;

