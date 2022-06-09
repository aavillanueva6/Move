const router = require('express').Router();
const { Comment } = require('../../models');

// create a new comment on a post
router.post('/', async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    req.body.post_id = Number(req.body.post_id);
    console.log(req.body);

    const commentData = await Comment.create(req.body);
    console.log('commentData', commentData);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
