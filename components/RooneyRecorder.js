import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Mic } from './Mic';
import { StackNavigator } from 'react-navigation';

export class RooneyRecorderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: '',
      score: 0,
    }
    this.finished = this.finished.bind(this);
  }

  finished(filepath, volume, time) {
    this.setState({filepath: filepath, score: volume * time});
    console.warn(this.state.filepath, this.state.score);
    this.props.navigation.navigate('RooneyRating', {
      filepath: this.state.filepath,
      score: this.state.score});
  }

  render() {
    return (
      <View>
        <Mic finished={this.finished} />
      </View>
    )
  }
}
