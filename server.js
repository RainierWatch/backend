'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const MongoDBUrl = 'mongodb://localhost:27017/hapijs';
const routes = require('./routes');

const server = new Hapi.Server({
  port: 3000,
  host: 'localhost'
});

server.route(routes);

(async () => {
  try {
    await server.start();
    // Once started, connect to Mongo through Mongoose
    mongoose.connect(MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
    console.log(`Server running at: ${server.info.uri}`);
  }
  catch (err) {
    console.log(err)
  }
})();