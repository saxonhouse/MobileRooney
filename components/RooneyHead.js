import React, { Component } from 'react';
import { View, Image, Animated, Text } from 'react-native';


export class RooneyHead extends Component {
  constructor(props) {
    super(props);
    this.rooneyAnim = new Animated.Value(0),
    this.animate = this.animate.bind(this);
  }

  componentWillReceiveProps(nextProps)  {
    this.animate(nextProps.scale);
  }

  animate(value) {
    Animated.spring(
      this.rooneyAnim,
      {
        toValue: value,
      }
    ).start();

  }

  render() {
    return (
      <View>
      <Animated.Image source={require('../libs/rooney.png')}
      style={{
        height: 200,
        transform: [{
          scale: this.rooneyAnim,
        }],
      }}
      resizeMode = 'contain'
      alt = 'Wayne Rooney' />
      </View>
    )
  }
}
