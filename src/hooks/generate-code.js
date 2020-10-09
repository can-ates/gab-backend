const { v4: uuid} = require('uuid')

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if(context.data.private) {
      context.data.ticket = uuid()

      return context
    } else return context
  };
};
