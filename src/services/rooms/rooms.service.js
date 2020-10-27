// Initializes the `rooms` service on path `/rooms`
const { Rooms } = require('./rooms.class');
const createModel = require('../../models/rooms.model');
const hooks = require('./rooms.hooks');

module.exports = function (app) {
  const options = {
    events: ['reflectMessages'],
    Model: createModel(app),
    paginate: {
      default: 100,
      max: 200
    },
    whitelist: ['$populate', '$regex', '$search', '$select']
  };

  // Initialize our service with any options it requires
  app.use('/rooms', new Rooms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rooms');

  service.hooks(hooks);
};
