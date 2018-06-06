import React, { Component } from 'react';
import { View, Image, Animated } from 'react-native';


export class RooneyHead extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.rooneyAnim = new Animated.Value(1);
  }

  componentDidMount () {
  this.animate();
  }

  animate() {
    Animated.spring(
      this.rooneyAnim,
      {
        toValue: this.props.scale,
      }
    ).start();
  }

  render() {
    return (
      <View>
      <Animated.Image source={{uri: "http://cdn.staticneo.com/w/footballmanager/9/90/5108390.png"}}
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
