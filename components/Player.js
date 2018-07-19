import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import getS3Url from '../libs/S3Getter.js';

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
              Rooney.release();
            } else {
              Rooney.reset();
            }
          })
        }, 100);
      }, 100);
    }

    if (this.props.local) {
      doSound(this.props.url);
    }
    else {
      getS3Url(this.props.url).then((path) => {
        doSound(path);
      }).catch((err) => console.warn('an error'));
    }
    }

  render() {
    return (
      <View>
        <Icon name='play-arrow' onPress={this.playRooney} title={"play me"} />
        <Text> {this.state.error} </Text>
      </View>
    )
  }


}
