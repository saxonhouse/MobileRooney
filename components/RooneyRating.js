import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Player } from './Player';
import { RooneyForm } from './RooneyForm';
import { StackNavigator } from 'react-navigation';
var Uploader = require('../libs/Uploader.js');

export class RooneyRating extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(player) {
    let filename = player + Date.now() + '.aac';
    let data = {
      player: player,
      score: this.props.navigation.state.score;
    }
    const uploadPromise = Uploader.upload(this.props.navigation.state.file, filename, data);
    uploadPromise.then((response) => {
      this.props.navigation.navigate('RooneyBoard', {response});
    }).catch((e) => {
      this.setState({error: e.message});
      console.log(e);
      return
    });

  }

  render() {
    return(
      const { params } = this.props.navigation.state;
      const score = params ? params.score : 0;
      <View>
        <Text> your Rooney score is {score} </Text>
        { params.url ? <Player url=params.url /> : null }
        <Text> Enter your initials to submit your Rooney to the Rooneyboard</Text>
        <RooneyForm onRooneySubmit=this.submit />
      </View>
    )
  }
}
