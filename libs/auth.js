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

getProfile(platform, data) {
  let profile = {};
  if (platform === 'facebook') {
    profile.id = data.id;
    profile.name = data.name;
    profile.picture = 'https://graph.facebook.com/'+data.id+'/picture?type=square'
    /* fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      console.warn(responseJson.data)
      profile.picture = responseJson.data.url;
    })
    .catch((error) => {
      profile.picture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    }); */
  }
  else if (platform === 'twitter') {
    profile.id = data.user.id_str;
    profile.name = data.user.name;
    profile.picture = data.user.profile_image_url;
  }
  else if (platform === 'google') {
    profile.id = data.id;
    profile.name = data.displayName;
    profile.picture = data.image.url;
  }
  return profile;
}

}

module.exports = {manager, authGetter}
