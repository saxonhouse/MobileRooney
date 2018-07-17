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
      token: {}
    }
    this.finished = this.finished.bind(this);
    this.loadBoard = this.loadBoard.bind(this);
  }

  componentDidMount() {
    if (this.props.navigation.state.params.token) {
      this.setState({
        token: this.props.navigation.state.params.token,
      })
    }
    if (this.props.navigation.state.params.user) {
      this.setState({
        user: this.props.navigation.state.params.user
      })
    }
  }

  finished(filepath, volume, time) {
    this.setState({filepath: filepath, score: volume});
    this.props.navigation.navigate('RooneyRating', {
      filepath: this.state.filepath,
      score: this.state.score,
      token: this.state.token,
      user: this.state.user
    });
  }

  loadBoard() {
    this.props.navigation.navigate('RooneyBoard', {getRooney: false, token: this.state.token, user: this.state.user});
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
