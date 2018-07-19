import React, { Component } from 'react';
import { Player } from './Player';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { RooneyForm } from './RooneyForm';
import { StackNavigator } from 'react-navigation';
import { UserBar } from './UserBar';
import styles from '../libs/styles'
var Uploader = require('../libs/Uploader.js');


export class RooneyRatingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      token: {},
      user: props.navigation.state.params.user
    }
    this.submit = this.submit.bind(this);
  }

  submit() {
    let filename = this.state.user.id + Date.now() + '.aac';
    let data = {
      user: this.state.user,
      score: this.props.navigation.state.params.score,
      filename: filename
    }
    Uploader.upload(this.props.navigation.state.params.filepath, filename, data).then((response) => {
      this.props.navigation.navigate('RooneyBoard', {
        getRooney: true,
        rooney: response.data,
        token: this.state.token,
        user: this.state.user
      })
    }).catch((e) => {
      this.setState({error: e.message});
      return
    });

  }

  render() {
    const { params } = this.props.navigation.state;
    const message1 = 'Oof! Wayne\'s looking pleased...'
    const message2 = 'Pft, Wayne\'s barely heard it...'
    return (
      <View style={styles.rater}>
        <UserBar user={this.state.user} />
        <View>
          <Text>  {params.score > 2.5 ? message1 : message2 } </Text>
          <Text> {params.score} </Text>
        </View>
          <Player url={params.filepath} local={true} />
          <View>
          <Text> Submit to the Rooneyboard below! </Text>
          <Button
            style={{backgroundColor: 'green'}}
            icon={{name:'ios-football', type:'ionicon'}}
            onPress={this.submit}
            title={"Submit"} />
          <Button
            style={{backgroundColor: 'red',}}
            icon={{name:'ios-trash-outline', type:'ionicon'}}
            onPress={() => this.props.navigation.navigate('RooneyRecorder', {
                token: this.state.token,
                user: this.state.user
              })
            }
            title={"Discard"} />
        </View>
        <Text> {this.state.error} </Text>
      </View>
    )
  }
}
