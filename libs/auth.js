import OAuthManager from 'react-native-oauth';
const options = require('./options.js');
const config = options.config;
const tokenroot = options.apiroot + '/auth/management';

const manager = new OAuthManager('ratemyrooney');
manager.configure(config);

const restToken = {

  getToken() {
    return new Promise((resolve, reject) =>{
      fetch(tokenroot, {
        method: 'post',
        headers: new Headers({
          'Authorization' : 'Basic ZG9ubmNoYTpsM24wcmU=',
          'Content_Type' : 'application/x-www-form-urlencoded'
        }),
        body: 'submit=Add Client'
      }).then((response) => response.json())
      .then((response) => {
        resolve(response);
      })
      .catch((error) => error.json())
      .then(error => reject.error);
    });
  }

}

module.exports = {manager, restToken};
