// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    context.app.service('rooms')._patch(
      context.data.roomId,
      {
        $push: { messages: context.result._id },
      },
      {
        query: {
          $populate: {
            path: 'messages',
            populate: {
              path: 'sender',
            },
          },
        },
      }
    ).then(res => {
      //JOINING ROOM CHANNEL
      // context.app.channel(`rooms/${res._id}`).join(context.params.connection)
      
      context.app.service('rooms').emit('reflectMessages', {
        messages: res.messages,
        roomId: res._id
      })
    });

    return context;
  };
};
