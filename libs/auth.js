import OAuthManager from 'react-native-oauth';
const options = require('./options.js');
const config = options.config;
const tokenroot = options.tokenroot;
const tokenauth = options.tokenauth;

const manager = new OAuthManager('ratemyrooney');
manager.configure(config);
let body = new FormData();
body.append('submit','Add Client');

const restToken = {

  getToken() {
    return new Promise((resolve, reject) =>{
      fetch(tokenroot, {
        method: 'POST',
        headers: {
          'Authorization' : tokenauth,
          'Content_Type' : 'multipart/form-data'
        },
        body: body
      }).then((response) => response.json())
      .then((response) => {
        resolve(response);
      })
      .catch(error => reject.error);
    });
  }

}

module.exports = {manager, restToken};
