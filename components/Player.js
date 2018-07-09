import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

export class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    this.playRooney = this.playRooney.bind(this);
  }

  playRooney() {
    function doSound(path) {
      // These timeouts are a hacky workaround for some issues with react-native-sound.
      // See https://github.com/zmxv/react-native-sound/issues/89.
      setTimeout(() => {
        const Rooney = new Sound(path, null, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        })
          // loaded successfully
          setTimeout(() => {
          Rooney.play((success) => {
            if (success) {
              console.log('successfully finished playing')
            } else {
              console.log('playback failed due to audio decoding errors')
            }
          })
        }, 100)
      }, 100)

    }
    
    doSound(this.props.url);

    }

  render() {
    return (
      <View>
        <Button onPress={this.playRooney} title={"play me"} />
        <Text> {this.state.error} </Text>
      </View>
    )
  }


}
