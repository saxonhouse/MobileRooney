import OAuthManager from 'react-native-oauth';
const options = require('./options.js');
const config = options.config;

const manager = new OAuthManager('ratemyrooney');
manager.configure(config);

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; // Region

const awsAuth = {

awsLogin(platform,response) {
    let login;
    if (platform === 'facebook') {
      login = {
        'graph.facebook.com': response.authResponse.accessToken
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


  return new Promise((resolve,reject) => {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: options.cognitoPoolId,
      Logins: login
      });

      // Obtain AWS credentials
      AWS.config.credentials.get(function(){
          // Access AWS resources here.
          if(err) reject(err);
          else resolve(AWS.config.credentials);
      });
  });
}

}

module.exports = {awsAuth, manager}
