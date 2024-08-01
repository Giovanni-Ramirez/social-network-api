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
// getter method to format the timestamp
thoughtSchema
    .virtual('formattedCreatedAt')
    .get(function() {
        return this.createdAt.toISOString(); // Format the timestamp as ISO string
    });

thoughtSchema
  .virtual('friendCount')
  .get(function () {
    return `${this.friends.length}`;
  });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;