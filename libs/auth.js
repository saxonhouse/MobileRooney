import OAuthManager from 'react-native-oauth';
const options = require('./options.js');
const config = options.config;

const manager = new OAuthManager('ratemyrooney');
manager.configure(config);

module.exports = manager;
