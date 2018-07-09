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

export function getS3Url(file) {
  const params = {
    Bucket: s3options.bucket,
    Key: file,
    Expires: 60
  };
  const url = s3.getSignedUrl("getObject", params);
  console.log("generated url: ", url);
  return url;
}
