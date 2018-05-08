import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

class RooneyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { player: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let player = this.state.player.trim();
    if (!player) {
      return;
    }
    this.props.onRooneySubmit(player);
  }
  render() {
    return (
      <View>
        <TextInput
          onChangeText={ (player) => this.setState({player}) }
          value={ this.state.player }
          onSubmitEditing = { this.handleSubmit }
         />
      </View>
    )
  }
}

export default RooneyForm;
