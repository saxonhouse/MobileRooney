import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { SocialIcon } from 'react-native-elements'
const Auth = require('../libs/auth.js');
const manager = Auth.manager;
const authGetter = Auth.authGetter;

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: {},
      error: '',
      loading: false
    }
    this.login = this.login.bind(this);
    this.loadBoard = this.loadBoard.bind(this);
  }

  login(platform, scopes) {
  this.setState({loading: true});
  manager.deauthorize(platform);
  manager.authorize(platform, scopes)
  .then((response) => {
    let platformUrl = authGetter.setUrl(platform);
    manager.makeRequest(platform, platformUrl)
    .then(resp => {
    console.warn('Data ->', resp.data);
    let profile = authGetter.getProfile(platform, resp.data);
    this.setState({user: profile, loading: false});
    this.props.navigation.navigate('RooneyRecorder', {user: this.state.user});
    })
    .catch(err => this.setState({error: err}))
    })
    .catch(err => this.setState({error: err}))
  }

  loadBoard() {
    this.props.navigation.navigate('RooneyBoard', {getRooney: false, });
  }

  render() {
    return(
      <View style= {{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
      }}>
        <Text> Login: </Text>
        <View style={{
          flexDirection: 'row',
        }}>
          <SocialIcon
            type={'twitter'}
            onPress={() => this.login('twitter', {scopes: 'profile'})}
            disabled = {this.state.loading}
          />
          <SocialIcon
            type={'facebook'}
            onPress={() => this.login('facebook')}
            disabled = {this.state.loading}
          />
          <SocialIcon
            type={'google'}
            onPress={() => this.login('google', {scopes: 'profile'})}
            disabled = {this.state.loading}
            iconColor = {'red'}
          />
        </View>
        <Text> {this.state.error} </Text>
      </View>
    )
  }
}
