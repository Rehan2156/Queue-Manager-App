import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert, Dimensions } from 'react-native'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: Dimensions.get('window').width-25,
  height: 300
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAPH6oiGujFFxMBgcOloqfaCQ6HUZaHyNE'
})(MapContainer);