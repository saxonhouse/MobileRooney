import React, { Component } from 'react';
import { Player } from './Player';
import { View, Text, Button } from 'react-native';
import { RooneyForm } from './RooneyForm';
import { StackNavigator } from 'react-navigation';
var Uploader = require('../libs/Uploader.js');

export class RooneyRatingScreen extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(player) {
    this.props.navigation.navigate('RooneyBoard');

  }

  render() {
    const { params } = this.props.navigation.state;
    const score = params ? params.score : 0;
    return (
      <View>
        <Text>  your Rooney score is {score} </Text>
        <Player url={params.filepath} />
        <Text> Enter your initials to submit your Rooney to the Rooneyboard</Text>
        <RooneyForm onRooneySubmit={this.submit} />
      </View>
    )
  }
}
