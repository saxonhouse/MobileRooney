// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
const options = require('../libs/options.js');
var dbUri = options.dbUri;
import Rooney from './model/rooney.js';

// and create our instances
const app = express();
const router = express.Router();

// db config -- set your URI from mLab in secrets.js
mongoose.connect(dbUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.get('/rooneys', (req, res) => {
  Rooney.find((err, rooneys) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: rooneys });
  });
});

router.post('/rooneys', (req, res) => {
  const rooney = new Rooney();
  // body parser lets us use the req.body
  const { player, audio, score, filename } = req.body;
  if (!player || !audio || !score || !filename) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: 'You must provide player, audio and score - and filename buddy!',
      body: req.body
    });
  }
  rooney.player = player;
  rooney.audio = audio;
  rooney.score = score;
  rooney.filename = filename;
  rooney.save((err, rooney) => {
    if (err) return res.json({ error: err });
    return res.json({ data: rooney });
  });
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
