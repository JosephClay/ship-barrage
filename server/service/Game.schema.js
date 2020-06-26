import mongoose from 'mongoose';

const { Schema } = mongoose;

export default new Schema({
  id: {
    type: String,
    index: true,
    required: [true, 'an id required'],
    trim: true,
    minlength: [5, 'invalid id'],
    maxlength: [5, 'invalid id'],
    unique: true,
  },
  game: {},
}, { timestamps: true });