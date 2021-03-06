import OAuthManager from 'react-native-oauth';
const options = require('./options.js');
const config = options.config;

const manager = new OAuthManager('ratemyrooney');
manager.configure(config);

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; // Region

const authGetter = {

setLogin(platform, response) {
  let login;
  if (platform === 'facebook') {
    login = {
      'graph.facebook.com': response.response.credentials.accessToken
    }
  }
  if (platform === 'google') {
    login = {
      'accounts.google.com': authResult['id_token']
    }
  }
  if (platform === 'twitter') {
    login = {
    'api.twitter.com' : response.token // CHECK THIS
    }
  }
  return login;
},

setUrl(platform) {
  let profileUrl;
  if (platform === 'facebook') {
    profileUrl = '/me';
  }
  if (platform === 'google') {
    profileUrl = 'https://www.googleapis.com/plus/v1/people/me';
  }
  if (platform === 'twitter') {
    profileUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
  }
  return profileUrl;
},

token(platform,response) {
  platformOptions = setLogin(platform, response);

  return new Promise((resolve,reject) => {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: options.cognitoPoolId,
      Logins: platformOptions.login
      });

      // Obtain AWS credentials
      AWS.config.credentials.get(function(){
          // Access AWS resources here.
          resolve(AWS.config.credentials.sessionToken);
      });
  });
},

}

module.exports = {manager, authGetter}
