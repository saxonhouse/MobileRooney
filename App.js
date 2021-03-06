import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { RooneyRecorderScreen } from './components/RooneyRecorder';
import { RooneyRatingScreen } from './components/RooneyRating';
import { RooneyBoardScreen } from './components/RooneyBoard';
import { LoginScreen } from './components/Login';

const RootStack = StackNavigator({
  Login: {
    screen: LoginScreen,
    },
  RooneyRecorder: {
    screen: RooneyRecorderScreen,
    },
  RooneyRating: {
    screen: RooneyRatingScreen,
    },
  RooneyBoard: {
    screen: RooneyBoardScreen,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
