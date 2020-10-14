const { Service } = require('feathers-mongoose');

exports.Messages = class Messages extends Service {
  async find(params) {}
  async get(id, params) {}
  async create(data, params) {
    return super.create({
      text: data.text ? data.text : null,
      image: data.image ? data.image : null,
      sender: data.sender,
    });
  }
  async update(id, data, params) {}
  async patch(id, data, params) {}
  async remove(id, params) {}
};
