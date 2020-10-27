const { Service } = require('feathers-mongoose');

exports.Rooms = class Rooms extends Service {
  async find(params) {
    return super
      .find({
        query: {
          _id: {
            $in: [...params.user.followedGroups],
          },
          $populate: [
            {
              path: 'messages',
              populate: {
                path: 'sender',
              },
            },
            { path: 'participants' },
            {
              path: 'founder',
            },
          ],
        },
      })
      .catch(res => {
        console.log(res);
      });
  }
  async get(id, params) {
    return super
      .find({
        query: {
          title: {
            $regex: new RegExp(params.query.title, 'i'),
          },
          $select: ['_id', 'title', 'avatar'],
          $limit: 5,
          founder: {
            $nin: [params.user._id, ...params.user.followedGroups],
          },
          participants: {
            $nin: [params.user._id],
          },
        },
      })
      .catch(err => console.log(err));
  }
  //TODO HANDLE RETURNED FIELDS
  async create(data, params) {
    return super.create(
      {
        title: data.title,
        private: data.private,
        founder: params.user._id,
        ticket: data.ticket ? data.ticket : null,
        avatar: data.color,
      },
      {
        query: {
          $populate: [
            {
              path: 'founder',
            },
          ],
        },
      }
    );
  }
  async update(id, data, params) {}

  async remove(id, params) {}
};
