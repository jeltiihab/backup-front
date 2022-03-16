import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
export class MapContainer extends Component {

    render() {
        const containerStyle = {
            position: 'relative',
            width: '90vw',
            height: '90vh',
        }
        return (
                <Map containerStyle={containerStyle} google={this.props.google} zoom={14} lat={60.955413} lng={30.337844}>
                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>

                    </InfoWindow>
                </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyC2VKY0e96PKPg-Nbdz_SvYZrMGO1fHkqo")
})(MapContainer)