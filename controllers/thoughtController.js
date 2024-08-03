const { User ,  Thought } = require('../models');

module.exports = {
    // Find all thoughts
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');;
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get single Thought by ID
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    //  Create a new Thought
      async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            {_id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );

          if (!user) {
            return res.status(404).json({ message: 'No user with that id!'})
          }

          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    //   Delete a thought by id
      async deleteUser(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            return res.status(404).json({ message: 'No Thought with that ID' });
          }
    
          res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
          res.status(500).json(err);
        }
      },
    //   Add a reaction in the thoughts array and found by Id
      async addReaction(req, res) {
        try {
          const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
          );
    
          if (!reaction) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(reaction);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    //   remove reaction req.params.reactionsId
      async removeReaction(req, res) {
        try {
            const user = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionsId } } },
                { runValidators: true, new: true }
            );
    
          if (!user) {
            res.status(404).json({ message: 'No user or friend with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
}