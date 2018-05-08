import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { RooneyRecorder } from './components/RooneyRecorder';
import { RooneyRating } from './components/RooneyRating';
import { RooneyBoard } from './components/RooneyBoard';

const RootStack = StackNavigator({
  RooneyRecorder: {
    screen: RooneyRecorder,
    },
  RooneyRating: {
    screen: RooneyRating,
    },
  RooneyBoard: {
    screen: RooneyBoard,
    }
  },
  {
    initialRouteName: 'RooneyRecorder',
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
