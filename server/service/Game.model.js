import mongoose from 'mongoose';
import Schema from './Game.schema';

const Model = mongoose.model('Game', Schema);
  
// https://mongoosejs.com/docs/api.html#model_Model.count
// https://mongoosejs.com/docs/api.html#model_Model.countDocuments
Model.count = query => Model.countDocuments(query);

export default Model;