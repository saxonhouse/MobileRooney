import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const RooneySchema = new Schema({
  player: {
    id: String,
    name: String,
    profile_pic: String
  },
  audio: String,
  filename: String,
  score: Number,
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Rooney', RooneySchema);
