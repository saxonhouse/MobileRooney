import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
const auth = require('../libs/auth.js');
const manager = auth.manager;
const restToken = auth.restToken;

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this)
  }

  login(platform, scopes) {
  console.warn(platform);
  manager.deauthorize(platform);
  manager.authorize(platform, scopes)
  .then((resp) => {
    console.warn(resp);
    restToken.getToken()
    .then(response => console.warn(response))
    .catch(err => console.warn(err))
  })
  .catch(err => console.warn(err))
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
      </View>
    )
  }
}