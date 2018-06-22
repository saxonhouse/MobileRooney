import OAuthManager from 'react-native-oauth';
const options = require('./options.js');
const config = options.config;

const manager = new OAuthManager('firestackexample')
manager.configure(config);

module.exports = manager;
