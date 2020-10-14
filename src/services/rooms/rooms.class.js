const { Service } = require('feathers-mongoose');

exports.Rooms = class Rooms extends Service {
  async find(params) {
    return super
      .find({
        query: {
          _id: {
            $in: [...params.user.followedGroups],
          },
        },
      })
      .catch(res => {
        console.log(res);
      });
  }
  async get(id, params) {}
  async create(data, params) {
    return super.create({
      title: data.title,
      private: data.private,
      founder: params.user._id,
      ticket: data.ticket ? data.ticket : null,
      avatar: data.color,
    });
  }
  async update(id, data, params) {}
  async patch(id, data, params) {}
  async remove(id, params) {}
};
