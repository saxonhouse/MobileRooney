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
    this.renderRooney = this.renderRooney.bind(this);
  }

  getMyRooney = () => {
      this.setState({myRooney: this.props.navigation.state.rooney})
    }


  getRooneys = () => {
    fetch(apiroot, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
        .then((responseJson) => {
        this.setState({data: responseJson.data});
      }).catch((error) => {
        console.warn(error);
    });
  }


  componentDidMount() {
    if (this.props.navigation.state.params.token) {
      this.setState({token: this.props.navigation.state.params.token})
    }
    if (this.props.navigation.state.params.getRooney) {
      this.getMyRooney();
    }

    this.getRooneys();
  }

  renderRooney() {
    if (this.props.navigation.state.params.getRooney) {
      let myRooney = this.state.myRooney;
      return (
        <View>
          <Text> Your Rooney </Text>
          <Rooney player={myRooney.player} audio={myRooney.audio} score={myRooney.score} token={this.state.token}/>
        </View>
      );
    }
  }

  render() {
    let leadingRooneys = this.state.data.map(
      rooney => {
        return(
          <View key={rooney._id} >
          <Rooney player={rooney.player} audio={rooney.audio} score={rooney.score} token={this.state.token} />
          </View>
        )
      }
    );

    return(
      <View>
        <Text> The Rooney Board </Text>
        {this.renderRooney()}
        <Text> All Time Best Rooneys </Text>
        { leadingRooneys }
      </View>
    )
  }

}
