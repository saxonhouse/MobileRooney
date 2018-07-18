import React, {Component} from 'react';
import { View, Text, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Player}  from './Player';
import { Rooney } from './Rooney';
import { Card, List, Button } from 'react-native-elements'

const options = require('../libs/options.js');
var apiroot = options.apiroot;

export class RooneyBoardScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      filter : 'all',
      data : [],
      myRooney: {},
      token: {},
      user: {}
    }
    this.renderRooney = this.renderRooney.bind(this);
  }

  getMyRooney = () => {
      this.setState({myRooney: this.props.navigation.state.params.rooney})
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
      }).catch((error) => this.setState(error: error));
  }


  componentDidMount() {
    if (this.props.navigation.state.params.token) {
      this.setState({
        token: this.props.navigation.state.params.token,
      })
    }
    if (this.props.navigation.state.params.user) {
      this.setState({
        user: this.props.navigation.state.params.user
      })
    }
    if (this.props.navigation.state.params.getRooney) {
      this.getMyRooney();
    }
    this.getRooneys();
  }

  renderRooney() {
    if (this.props.navigation.state.params.rooney) {
      let myRooney = this.props.navigation.state.params.rooney;
      return (
        <View>
          <Text> Your Rooney </Text>
          <Rooney user={myRooney.user} audio={myRooney.filename} score={myRooney.score} token={this.state.token.aws}/>
        </View>
      );
    }
  }
  render() {


    let leadingRooneys = this.state.data.map(
      rooney => {
        return(
          <View key={rooney._id} >
          <Rooney user={rooney.user} audio={rooney.filename} score={rooney.score} token={this.state.token.aws} />
          </View>
        )
      }
    );

    return(
      <View>
        <Text> The Rooney Board </Text>
        {this.renderRooney()}
        <List>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View>
              <Rooney user={item.user} score={item.score} audio={item.filename} />
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </List>
      </View>
    )
  }

}
