'use strict';

import mongoose from 'mongoose';

import { log } from './util';

const state = {
  isOn: false,
};

export const connect = (testing = false) => {
  log(`__DB_UP__ ${process.env.MONGO_URI}`);
  if (state.isOn || testing) {
    return Promise.reject(new Error('__ERROR__ Already connected to DB'));
  }

  state.isOn = true;
  return mongoose.connect(process.env.MONGO_URI);
};

export const disconnect = () => {
  log('__DB_DOWN__');
  if (!state.isOn) {
    return Promise.reject(new Error('__ERROR__ Not connected to DB'));
  }

  state.isOn = false;
  return mongoose.disconnect();
};
