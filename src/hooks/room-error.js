// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    throw new errors.GeneralError({
      name: context.error.type,
      code: context.error.code,
      className: context.error.className,
      errors: context.error.errors
    })
  };
};
