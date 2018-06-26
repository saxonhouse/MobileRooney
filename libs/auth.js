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
          'Authorization' : 'Basic '+btoa('donncha:l3n0re'),
          'Content_Type' : 'application/x-www-form-urlencoded'
        }),
        body: 'submit=Add Client'
      }).then((response) => response.json())
      .then((response) => {
        resolve(response);
      })
    });
  }

}

module.exports = {manager, restToken};
