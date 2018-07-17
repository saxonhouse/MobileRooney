import React, { Component } from 'react';
import { Player } from './Player';
import { View, Text, Button } from 'react-native';
import { RooneyForm } from './RooneyForm';
import { StackNavigator } from 'react-navigation';
import { UserBar } from './UserBar';
var Uploader = require('../libs/Uploader.js');


export class RooneyRatingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      token: {},
      user: {}
    }
    this.submit = this.submit.bind(this);
    this.discard = this.discard.bind(this);
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

  submit() {
    let filename = this.state.user.id + Date.now() + '.aac';
    let data = {
      user: this.state.user,
      score: this.props.navigation.state.params.score,
      filename: filename
    }
    console.warn(data);
    Uploader.upload(this.props.navigation.state.params.filepath, filename, data).then((response) => {
      this.props.navigation.navigate('RooneyBoard', {
        getRooney: true,
        rooney: response.data,
        token: this.state.token,
        user: this.state.user
      })
    }).catch((e) => {
      this.setState({error: e.message});
      console.warn(e);
      return
    });

  }

  discard() {
    this.props.navigation.navigate('RooneyRecorder', {
      token: this.state.token,
      user: this.state.user
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <UserBar user={this.state.user} />
        <Text>  your Rooney score is {params.score} </Text>
        <Player url={params.filepath} local={true} />
        <Text> Enter your initials to submit your Rooney to the Rooneyboard</Text>
        <Button onPress={this.submit} title={"Submit"} />
        <Button onPress={this.discard} title={"Discard"} />
        <Text> {this.state.error} </Text>
      </View>
    )
  }
}
