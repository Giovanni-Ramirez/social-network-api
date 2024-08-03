const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteUser,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// api/thoughts
router
  .route('/')
  .get(getThoughts)
  .post(createThought);

// api/:toughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteUser);

// api/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// api/:thoughtId/reactions/:reactionsId
router
  .route('/:thoughtId/reactions/:reactionsId')
  .delete(removeReaction);


module.exports = router;