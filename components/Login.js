import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
const Auth = require('../libs/auth.js');
const manager = Auth.manager;
const authGetter = Auth.authGetter;

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: {},
      error: ''
    }
    this.login = this.login.bind(this);
    this.loadBoard = this.loadBoard.bind(this);
  }

  login(platform, scopes) {
  manager.deauthorize(platform);
  manager.authorize(platform, scopes)
  .then((response) => {
    let platformUrl = authGetter.setUrl(platform);
    manager.makeRequest(platform, platformUrl)
    .then(resp => {
    console.warn('Data ->', resp.data);
    let profile = authGetter.getProfile(platform, resp.data);
    this.setState({user: profile});
    this.props.navigation.navigate('RooneyRecorder', {user: this.state.user});
    })
    .catch(err => console.warn(err));
    })
    .catch(err => console.warn(err))
  }

  loadBoard() {
    this.props.navigation.navigate('RooneyBoard', {getRooney: false, });
  }

  render() {
    return(
      <View>
        <Text> Login with Twitter </Text>
        <Button onPress={() => this.login('twitter', {scopes: 'profile'})} title={'Login'} />
        <Text> Login with Facebook </Text>
        <Button onPress={() => this.login('facebook')} title={'Login'} />
        <Text> Login with Google</Text>
        <Button onPress={() => this.login('google', {scopes: 'profile'})} title={'Login'} />
        <Button onPress={this.loadBoard} title={"RooneyBoard"} />
        <Text> {this.state.error} </Text>
      </View>
    )
  }
}
