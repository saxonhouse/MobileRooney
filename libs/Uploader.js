import { RNS3 } from 'react-native-aws3';
const options = require('./options.js');

const Uploader = {
  upload(file, filename, data) {
    const file = {
  uri: file,
  name: filename,
  type: 'audio/aac'
  }

  RNS3.put(file, options).then(response => {
    if (response.status !== 201)
      throw new Error("Failed to upload to S3");
    console.log(response.body);
    data.audio = response.body.postResponse.location;
    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return response;
    }).catch(error) {
      throw error;
    };
  }

}

}

module.exports = Uploader;
