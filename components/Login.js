import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
const manager = require('../libs/auth.js');

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this)
  }

  login(platform) {
  console.warn(platform);
  manager.authorize(platform)
  .then(resp => console.warn(resp))
  .catch(err => console.warn(err));
  }

  render() {
    return(
      <View>
        <Text> Login with Twitter </Text>
        <Button onPress={() => this.login('twitter')} title={'Login'} />
        <Text> Login with Facebook </Text>
        <Button onPress={() => this.login('facebook')} title={'Login'} />
        <Text> Login with Google</Text>
        <Button onPress={() => this.login('google')} title={'Login'} />
      </View>
    )
  }
}
