import AWS from "aws-sdk/dist/aws-sdk-react-native";
const options = require('./options.js');
const s3options = options.s3options;

const s3 = new AWS.S3({
  region: s3options.region,
  credentials: {
    accessKeyId: s3options.accessKey,
    secretAccessKey: s3options.secretKey
  }
});

function getS3Url(file) {
  return new Promise((reject,resolve) => {
    const params = {
    Bucket: s3options.bucket,
    Key: file,
    Expires: 60
    };
    const url = s3.getSignedUrl("getObject", params, (url, err) => {
      if (err) reject(err);
      else resolve(url);
    });
  });

}

export default getS3Url;
