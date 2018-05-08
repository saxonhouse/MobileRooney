import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
    this.playRooney = this.playRooney.bind(this);
  }

  playRooney = (url) => {
    const Rooney = new Sound(url, null, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
        }
      // loaded successfully
      Rooney.play();
      console.log('duration in seconds: ' + Rooney.getDuration());
    })
  }

  render() {
    return (
      <View>
        <Button title="play me" onPress={this.playRooney(this.props.url)} />
        <Text> {this.state.error} </Text>
      </View>
    )
  }


}
