const { authenticate } = require('@feathersjs/authentication').hooks;

const generateCode = require('../../hooks/generate-code');

const addUsersFollowing = require('../../hooks/add-users-following');

const roomError = require('../../hooks/room-error');

const generateAvatar = require('../../hooks/generate-avatar');

const addUsersChannel = require('../../hooks/add-users-channel');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [generateCode(), generateAvatar()],
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
    patch: [addUsersChannel()],
    remove: []
  },

  error: {
    all: [roomError()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
