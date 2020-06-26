import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Game from './Game.model';
import {
  IS_TEST,
  DATABASE_URI,
  DATABASE_CONFIG,
} from '../config';

export default {
  async connect() {
    const mongod = IS_TEST ? new MongoMemoryServer() : undefined;
    const uri = IS_TEST ? await mongod.getConnectionString() : DATABASE_URI;
    
    return new Promise((resolve, reject) => {
      mongoose.connection.once('open', () => {
        console.log(`[DB] connected`);
        resolve();
      });
      
      mongoose.connection.on('error', reject);

      mongoose.connect(uri, DATABASE_CONFIG);
    });
  },

  async all() {
    return Game.find();
  },

  async findAllOlderThan(minTime) {
    const entries = await Game.find({
      updatedAt: {
        $lt: minTime
      }
    }, { id: 1 });

    return entries.map(({ id }) => id);
  },

  async save(game) {
    return Game.findOneAndUpdate({ id: game.id() }, {
      id: game.id(),
      game: game.toJSON(),
    }, {
      upsert: true,
      returnOriginal: false,
    });
  },

  async remove(id) {
    return Game.findOneAndDelete({ id });
  },

  async clean(ids) {
    return Game.deleteMany({ id: ids });
  },
};