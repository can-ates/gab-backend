// rooms-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'rooms';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      private: {
        type: Boolean,
        required: true,
      },
      participants: [
        {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
      ],
      messages: [
        {
          type: Schema.Types.ObjectId,
          ref: 'messages',
        },
      ],
      founder: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      ticket: {
        type: String,
      },
      avatar: {
        type: String,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );


  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
