import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Player from './Player';
import Rooney from './Rooney';
var apiroot = require('../libs/options.js');

export class RooneyBoardScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      'filter' : 'all',
      'data' : [],
      'myRooney': {}
    }
  }

  getMyRooney = () => {
    let url = apiroot + '/?_id=' + this.props.navigation.state._id;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
      }).then((response) => {
        this.setState({'myRooney': response});
      }).catch((error) => {
        console.warn(error);
      });
    }


  getRooneys = () => {
    fetch(apiroot, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
      }).then((response) => {
        this.setState({'data':response.items});
      }).catch((error) => {
        console.warn(error);
      });
    }


  componentDidMount() {
    if (this.props.navigation.state._id) {
      this.getMyRooney();
    }
    this.getRooneys();
  }

  render() {
    let myRooney = this.state.myRooney;
    let leadingRooneys = this.state.data.map(
      rooney => {
        return(
          <Rooney player={rooney.player} key={rooney[0]}>
            <Player url={rooney.audio} />
            <Text> {rooney.score} </Text>
          </Rooney>
        )
      }
    );

    return(
      <View>
        <Rooney player={myRooney.player}>
          <Player url={myRooney.audio} />
          <Text> {myRooney.score} </Text>
        </Rooney>
        { leadingRooneys }
      </View>
    )
  }

}
