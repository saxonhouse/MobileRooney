import React, {Component} from 'react';
import { View, Image, Text} from 'react-native';

export class UserBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View>
        <Image source={{uri: this.props.user.picture}} />
        <Text> {this.props.user.name} </Text>
      </View>
    )
  }
}
