import React, { Component } from 'react';
import { View, Image } from 'react-native';

const rooneyStyle = {
  transition: 'height 0.1s ease-out'
}

export class RooneyHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const size = this.props.size;
    return (
      <View>
      <Image source={{uri: "http://cdn.staticneo.com/w/footballmanager/9/90/5108390.png"}}
      style = {{height: {size}, transition: 'height 0.1s ease-out'}}
      alt = 'Wayne Rooney' />
      </View>
    )
  }
}
