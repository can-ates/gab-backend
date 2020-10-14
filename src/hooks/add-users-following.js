// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    context.app
      .service('users')
      .patch(
        context.params.user._id,
        {
          $push: { followedGroups: context.result._id },
        },
        {
          query: { $populate: 'followedGroups', $select: ['followedGroups'] },
        }
      )
      .then(result => {
        
        // context.service.emit('followedGroups', {
        //   groups: result.followedGroups,
        // });
      })
      .catch(err => {
        
      });

    return context;
  };
};
