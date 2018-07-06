const options = require('./options.js');

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; // Region

const Auth = {

awsAuth(platform,response) {
  var loginSettings = {
    'facebook' : {
      'graph.facebook.com': response.authResponse.accessToken
    },
    'google' : {
      'accounts.google.com': authResult['id_token']
    },
    'twitter' : {
      'api.twitter.com' : response.token // CHECK THIS
    }
  }

  return new Promise((resolve,reject) => {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: options.cognitoPoolId,
      Logins: loginSettings[platform]
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

module.exports = {awsAuth}
