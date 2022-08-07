const { Schema, model, Types } = require('mongoose');

//reaction is a subdoc of thought
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //add getter method for datestamp
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //add getter method for datestamp
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [{ reactionSchema }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return `${this.reactions.length}`;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
