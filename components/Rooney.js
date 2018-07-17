import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Player } from './Player';


export class Rooney extends Component {
  render() {
    const { user } = this.props;
    if (!user.picture) {
      user.picture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
    if (!user.name) {
      user.name = 'User';
    }
    return (
      <View>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: user.picture}} />
        <Text>{user.name}</Text>
        <Player url={this.props.audio} />
        <Text> {this.props.score} </Text>
      </View>
    )
  }
}
