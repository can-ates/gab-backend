const { Service } = require('feathers-mongoose');

exports.Rooms = class Rooms extends Service {
  async find(params) {
    return super.find({
      query: {
        _id: {
          $in: [...params.user.followedGroups],
        },
      },
    });
  }
  async get(id, params) {}
  async create(data, params) {
    return super.create({
      title: data.title,
      private: data.private,
      founder: data.founder,
      ticket: data.ticket ? data.ticket : null,
    });
  }
  async update(id, data, params) {}
  async patch(id, data, params) {}
  async remove(id, params) {}
};
