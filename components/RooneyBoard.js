import React, {Component} from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Player}  from './Player';
import { Rooney } from './Rooney';
import { List, Button, Icon } from 'react-native-elements'

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
      user: props.navigation.state.params.user,
      loadingMyRooney: true,
      loadingBoard: true
    }
    this.renderRooney = this.renderRooney.bind(this);
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
        this.setState({data: responseJson.data, loadingBoard: false});
      }).catch((error) => this.setState(error: error));
  }


  componentDidMount() {
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

    return(
      <View style={{
        flex: 1
      }}>
        <ScrollView>
          {this.renderRooney()}
          <Text> The Rooney Board </Text>
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
        </ScrollView>
        <View>
          <Button
          icon={{name:'chevron-left'}}
          onPress={() =>
            this.props.navigation.navigate('RooneyRecorder', {user: this.state.user})
          }
          title={"Try another"} />
        </View>
      </View>
    )
  }

}
