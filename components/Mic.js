import React, { Component } from 'react';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import { Icon } from 'react-native-elements';
import { RooneyHead } from './RooneyHead';
var uuid = require('react-native-uuid');
let audioPath = AudioUtils.DocumentDirectoryPath + '/' + uuid.v1() +'.aac';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform,
  PermissionsAndroid,
} from 'react-native';

export class Mic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      path : '',
      volume: 0,
      volumeAverage: 0,
      currentTime: 0,
      hasPermission: undefined,
      finished: '',
      error: '',
      scale: 1,
      audioPath: audioPath,
      stoppedRecording: undefined
    }
  }

  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      if (!hasPermission) return;

      AudioRecorder.prepareRecordingAtPath(this.state.audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        MeteringEnabled: true,
      });

      AudioRecorder.onProgress = (data) => {
          this.setState({currentTime: Math.floor(data.currentTime)});
          if (Platform.OS !== 'android') {
            meter = Math.floor(data.currentMetering)
            this.setState({
              volume: meter,
              scale: (meter+35)/10
            });
          }

        };

      AudioRecorder.onFinished = (data) => {
          // Android callback comes in the form of a promise instead.
          if (Platform.OS === 'ios') {
            this._finishRecording(data.status === "OK", data.audioFileURL);
          }
        };
    });
  }

  _checkPermission() {
      if (Platform.OS !== 'android') {
        return Promise.resolve(true);
      }

      const rationale = {
        'title': 'Microphone Permission',
        'message': 'AudioExample needs access to your microphone so you can record audio.'
      };

      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
        .then((result) => {
          return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
        });
    }

    _renderButton(title, onPressIn, onPressOut) {

      return (
        <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
          <Icon
            name="record-rec"
            type="material-community"
            color="red"
            size={90} />
        </TouchableWithoutFeedback>
      );
    }

    async _record() {

      if (this.state.recording) {
        this._stop();
        return;
      }

      if (!this.state.hasPermission) {
        this.setState({error: 'Can\'t record, no permission granted!'});
        return;
      }

      if(this.state.stoppedRecording){
        this.prepareRecordingPath(this.state.audioPath);
      }

      this.setState({recording: true});

      try {
        const filePath = await AudioRecorder.startRecording();
      } catch (error) {
        this.setState({error: error.message});
      }
      var c = 0;
      var vt = 0;
      var scaleString = ''
      this._record.interval = setInterval(() => {
        c += 1
        vt += this.state.volume;
        this.setState({ volumeAverage: vt/c });
      }, 100);
    }

    async _stop() {
      if (!this.state.recording) {
        return;
      }

      clearInterval(this._record.interval);
      this.setState({stoppedRecording: true, recording: false, paused: false});
      try {
        const filePath = await AudioRecorder.stopRecording();

        if (Platform.OS === 'android') {
          this._finishRecording(true, filePath);
        }

      } catch (error) {
        this.setState({error: error.message});
      }
    }

    _finishRecording(didSucceed, filePath) {
      this.setState({ finished: didSucceed });
      this.props.finished(filePath, this.state.volumeAverage, this.state.currentTime);
    }

    render() {
    return (
      <View style= {{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <RooneyHead scale={this.state.scale} />
        {this._renderButton("RECORD", () => {this._record()}, () => {this._stop()} )}
        <Text> {this.state.error} </Text>
      </View>
    )
    }

}
