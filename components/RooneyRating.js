import React, { Component } from 'react';
import { Player } from './Player';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
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
    const message1 = 'Oof! Wayne\'s looking pleased...'
    const message2 = 'Pft, Wayne\'s barely heard it...'
    return (
      <View>
        <UserBar user={this.state.user} />
        <Text>  {params.score > 2.5 ? message1 : message2 } </Text>
        <Text> {params.score} </Text>
        <Player url={params.filepath} local={true} />
        <Text> Submit to the Rooneyboard below! </Text>
        <Button onPress={this.submit} title={"Submit"} />
        <Button onPress={this.discard} title={"Discard"} />
        <Text> {this.state.error} </Text>
      </View>
    )
  }
}
