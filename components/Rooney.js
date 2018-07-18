import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Player } from './Player';
import { Avatar, ListItem } from 'react-native-elements'


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
      <ListItem
        roundavatar
        avatar={{uri: user.picture}}
        title={user.name}
        subtitle={this.props.score}
        rightIcon={
          <Player url={this.props.audio} />
        }
      />
      </View>
    )
  }
}
