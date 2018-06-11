import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Player}  from './Player';
import { Rooney } from './Rooney';
var apiroot = require('../libs/options.js');
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
      data : testdata,
      myRooney: {}
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
        console.warn(response);
      }).catch((error) => {
        console.warn(error);
    });
  }


  componentDidMount() {
    if (this.props.navigation.state._id) {
      this.getMyRooney();
    }
    console.warn('fetching rooneys');
    this.getRooneys();
  }

  render() {
    let myRooney = this.state.myRooney;
    let leadingRooneys = this.state.data.map(
      rooney => {
        return(
          <Rooney player={rooney.player} key={rooney._id}>
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
