import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import { RooneyHead } from './RooneyHead';
let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

export class Mic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      path : '',
      volume: 0,
      volumeAverage: 0,
      currentTime: 0,
      hasPermission: false,
      finished: '',
      error: ''
    }
  }

  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      if (!hasPermission) return;

      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        MeteringEnabled: true
      });

      AudioRecorder.onProgress = (data) => {
          this.setState({currentTime: Math.floor(data.currentTime)});
          this.setState({volume: Math.floor(data.currentMetering)});
        };

      AudioRecorder.onFinished = (data) => {
          // Android callback comes in the form of a promise instead.
          if (Platform.OS === 'ios') {
            this._finishRecording(data.status === "OK", data.audioFileURL);
          }
        }
    }
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
          console.log('Permission result:', result);
          return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
        });
    }

    async _record() {
      if (this.state.recording) {
        console.warn('Already recording!');
        return;
      }

      if (!this.state.hasPermission) {
        console.warn('Can\'t record, no permission granted!');
        return;
      }

      if(this.state.stoppedRecording){
        this.prepareRecordingPath(this.state.audioPath);
      }

      this.setState({recording: true});

      try {
        const filePath = await AudioRecorder.startRecording();
      } catch (error) {
        console.error(error);
        this.setState({error: error});
      }

      var c = 0;
      var vt = 0;
      this._record.interval = setInterval(() => {
        c += 1
        vt += this.state.volume;
        this.setState({ volumeAverage: vt/c })
      }, 200);
    }

    async _stop() {
      if (!this.state.recording) {
        console.warn('Can\'t stop, not recording!');
        return;
      }

      clearInterval(this._record.interval);
      this.setState({stoppedRecording: true, recording: false, paused: false});

      try {
        const filePath = await AudioRecorder.stopRecording();

        if (Platform.OS === 'android') {
          this._finishRecording(true, filePath);
        }
        this.props.finished(filePath, this.state.volumeAverage, this.state.currentTime);
      } catch (error) {
        console.error(error);
        this.setState({error: error});
      }
    }

    _finishRecording(didSucceed, filePath) {
      this.setState({ finished: didSucceed });
      console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    }

    render() {
    return (
      <View>
        <RooneyHead size={150 + 200*(this.state.volume)} />
        <Button title={this.state.recording ? 'Stop' : 'Record'}
        onPress={this.state.recording ? this._record() : this._stop()} />
        <Text> {this.state.currentTime} <Text>
        <Text> {this.state.volume} </Text>
        <Text> {this.state.error} </Text>
      </View>
    )
    }

}
