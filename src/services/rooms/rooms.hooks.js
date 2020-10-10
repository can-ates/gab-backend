const { authenticate } = require('@feathersjs/authentication').hooks;

const generateCode = require('../../hooks/generate-code');

const addUsersFollowing = require('../../hooks/add-users-following');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [generateCode()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addUsersFollowing()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
