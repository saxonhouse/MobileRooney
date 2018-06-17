import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Player}  from './Player';
import { Rooney } from './Rooney';
const options = require('../libs/options.js');
var apiroot = options.apiroot;
let testdata = [
  {
    _id: 'example1',
    player: 'tjh',
    score: 4.5,
    audio: 'http://audio.com/audio1.mp3'
  },
  {
    _id: 'example2',
    player: 'ttt',
    score: 3.5,
    audio: 'http://audio.com/audio1.mp3'
  },
  {
    _id: 'example3',
    player: 'tom',
    score: 2.5,
    audio: 'http://audio.com/audio1.mp3'
  },
]

export class RooneyBoardScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      filter : 'all',
      data : [],
      myRooney: {}
    }
  }

  getMyRooney = () => {
    let url = this.props.navigation.state.url;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
      }).then((response) => {
        console.warn(response)
        this.setState({myRooney: response})
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
        this.setState({data: response.body.items});
      }).catch((error) => {
        console.warn(error);
    });
  }


  componentDidMount() {
    if (this.props.navigation.state.url) {
      this.getMyRooney();
    }
    this.getRooneys();
  }

  render() {
    let myRooney = this.state.myRooney;
    let leadingRooneys = this.state.data.map(
      rooney => {
        return(
          <View>
          <Rooney player={rooney.player} audio={rooney.audio} key={rooney._id} />
          <Text> {rooney.score} </Text>
          </View>
        )
      }
    );

    return(
      <View>
        <Rooney player={myRooney.player} audio={myRooney.audio} />
        <Text> {myRooney.score} </Text>
        { leadingRooneys }
      </View>
    )
  }

}
