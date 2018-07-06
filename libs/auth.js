const options = require('./options.js');

var AWS = require('aws-sdk/dist/aws-sdk-react-native');

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: options.cognitoPoolId,
});
