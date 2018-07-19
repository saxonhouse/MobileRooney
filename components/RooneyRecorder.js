import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Mic } from './Mic';
import { UserBar } from './UserBar';
import { StackNavigator } from 'react-navigation';
import styles from '../libs/styles';
import rooneyRater from '../libs/rooneyrater';

export class RooneyRecorderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: '',
      score: 0,
      token: {},
      user: props.navigation.state.params.user
    }
    this.finished = this.finished.bind(this);
  }

  finished(filepath, volume, time) {
    let score = rooneyRater(volume, time);
    this.setState({filepath: filepath, score: score});
    this.props.navigation.navigate('RooneyRating', {
      filepath: this.state.filepath,
      score: this.state.score,
      token: this.state.token,
      user: this.state.user
    });
  }

  render() {
    return (
      <View style={styles.recorder}>
        <UserBar user={this.state.user} />
        <Mic finished={this.finished} />
        <Button
          icon={{name: 'md-trophy', type:'ionicon'}}
          onPress={() => this.props.navigation.navigate('RooneyBoard',
            {getRooney: false, user: this.state.user})}
          title="RooneyBoard" />
      </View>

    )
  }
}
