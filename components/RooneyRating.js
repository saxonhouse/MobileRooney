import React, { Component } from 'react';
import { Player } from './Player';
import { View, Text, Button } from 'react-native';
import { RooneyForm } from './RooneyForm';
import { StackNavigator } from 'react-navigation';
var Uploader = require('../libs/Uploader.js');

export class RooneyRatingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    }
    this.submit = this.submit.bind(this);
    this.discard = this.discard.bind(this);
  }

  submit(player) {
    let filename = player + Date.now() + '.aac';
    let data = {
      player: player,
      score: this.props.navigation.state.score,
    }
    Uploader.upload(this.props.navigation.state.filepath, filename, data).then((response) => {
      console.warn(response);
      this.props.navigation.navigate('RooneyBoard', {getRooney: true, rooney: response.data});
    }).catch((e) => {
      this.setState({error: e.message});
      console.warn(e);
      return
    });

  }

  discard() {
    this.props.navigation.navigate('RooneyRecorder');
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>  your Rooney score is {params.score} </Text>
        <Player url={params.filepath} />
        <Text> Enter your initials to submit your Rooney to the Rooneyboard</Text>
        <RooneyForm onRooneySubmit={this.submit} />
        <Button onPress={this.discard} title={"Discard"} />
        <Text> {this.state.error} </Text>
      </View>
    )
  }
}
