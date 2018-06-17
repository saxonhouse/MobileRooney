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
    this.loadBoard = this.loadBoard.bind(this);
  }

  finished(filepath, volume, time) {
    this.setState({filepath: filepath, score: volume * time});
    this.props.navigation.navigate('RooneyRating', {
      filepath: this.state.filepath,
      score: this.state.score});
  }

  loadBoard() {
    this.props.navigation.navigate('RooneyBoard');
  }

  render() {
    return (
      <View>
        <Mic finished={this.finished} />
        <Button onPress={this.loadBoard} title={"RooneyBoard"} />
      </View>

    )
  }
}
