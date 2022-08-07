const { Schema, model } = require('mongoose');

// Schema to create a user model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //validate email format from https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax. delete this note after testing
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    thoughts: {
      //actvity 21 models/Post ln 8
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return `${this.friends.length}`;
});

const User = model('User', userSchema);

module.exports = User;
