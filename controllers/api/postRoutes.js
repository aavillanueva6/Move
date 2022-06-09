const router = require('express').Router();
const { Post, Comment } = require('../../models');

// create new post
router.post('/', async (req, res) => {
<<<<<<< HEAD

  try {
    req.body.user_id = req.session.user_id;

    const postData = await Post.create(req.body);

=======
  try {
    req.body.user_id = req.session.user_id;

    const postData = await Post.create(req.body);

>>>>>>> a83a11e (adding assets)
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update existing post
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id' });
      return;
    }

    console.log(postData);

    const updatedPostData = await Post.update({
      title: req.body.title,
      content: req.body.content
      //TODO category_id
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    }
    );

    console.log(updatedPostData);
    res.status(200).json(updatedPostData);
  } catch (err) {
    res.status(500).json(err);
  }
<<<<<<< HEAD

=======
>>>>>>> a83a11e (adding assets)
});

//id
//title
//content
//date_created
//user_id
//category_id

// delete an existing post
router.delete('/:id', async (req, res) => {
  try {
    const response = await Post.destroy({
      where: {
        id: req.params.id,
<<<<<<< HEAD
        user_id: req.session.user_id,
      },
=======
        user_id: req.session.user_id
      }
>>>>>>> a83a11e (adding assets)
    });

    if (!response) {
      res.status(404).json({ message: 'No post found with that id' });
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

<<<<<<< HEAD
module.exports = router;
=======
// create a new comment on a post
router.post('/:id/comment', async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    req.body.post_id = req.params.id;

    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
>>>>>>> a83a11e (adding assets)
