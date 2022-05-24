const router = require('express').Router();
const { Comment } = require('../../models');

// Get comments
router.get('/', (req, res) => {
    // Access the Comment model and run .findAll() method to get all comments
    Comment.findAll()
      // return the data as JSON formatted
      .then(dbCommentData => res.json(dbCommentData))
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', (req, res) => {
    // check the session
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        // use the id from the session
        user_id: req.session.user_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
});

// Delete a comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(dbCommentData => {
      if(!dbCommentData){
          res.status(400).json({message: 'No comment found with this id'});
          return;
      }
      res.json(dbCommentData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;