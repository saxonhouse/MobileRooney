import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Mic } from './Mic';
import { UserBar } from './UserBar';
import { StackNavigator } from 'react-navigation';
import rooneyRater from '../libs/rooneyrater';

export class RooneyRecorderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: '',
      score: 0,
      token: {},
      user: {}
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
    let score = rooneyRater(volume, time);
    this.setState({filepath: filepath, score: score});
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
        <UserBar user={this.state.user} />
        <Mic finished={this.finished} />
        <Button onPress={this.loadBoard} title={"RooneyBoard"} />
      </View>

    )
  }
}
