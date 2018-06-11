import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Player } from './Player';


export class Rooney extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.player}</Text>
        <Player url={this.props.audio} />
        <Text> {this.props.score} </Text>
      </View>
    )
  }
}
