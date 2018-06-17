import { RNS3 } from 'react-native-aws3';
const options = require('./options.js');
const s3options = options.s3options;
var apiroot = options.apiroot;

const Uploader = {

  upload(file, filename, data) {
  const s3File = {
    uri: file,
    name: filename,
    type: 'audio/aac'
  }

  return new Promise((resolve,reject) => {
    RNS3.put(s3File, s3options).then(response => {
      if (response.status !== 201) {
        throw new Error("Failed to upload to S3");
        console.warn('s3 failed');
      }
      data.audio = response.body.postResponse.location;
      fetch(apiroot, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });

  });

  }
}

module.exports = Uploader;
