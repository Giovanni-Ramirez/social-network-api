const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction')

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
      }
  },
    username: {
        type: Schema.Types.String,
        required: true,
        ref: 'user',
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;