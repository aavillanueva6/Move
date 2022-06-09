const router = require('express').Router();
const { User, Category, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// renders homepage, limits posts to 20
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      limit: 20,
      include: [
        {
          model: User,
<<<<<<< HEAD
          attributes: ['username'],
        },
      ],
=======
          attributes: ['username']
        }
      ]
>>>>>>> a83a11e (adding assets)
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
<<<<<<< HEAD
      logged_in: req.session.logged_in,
=======
      logged_in: req.session.logged_in
>>>>>>> a83a11e (adding assets)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders page with posts filtered by categories
router.get('/category/:id', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { category_id: req.params.id },
      include: [
        {
          model: User,
<<<<<<< HEAD
          attributes: ['username'],
        },
        {
          model: Category,
        },
      ],
=======
          attributes: ['username']
        },
        {
          model: Category
        }
      ]
>>>>>>> a83a11e (adding assets)
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // TODO: render page name
    res.render('category', {
      posts,
<<<<<<< HEAD
      logged_in: req.session.logged_in,
=======
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Category,
          attributes: ['name']
        },
        {
          model: Comment,
          include: [User]
        }
      ]
    });

    const post = postData.get({ plain: true });

    // TODO: render page name
    res.render('post', {
      post,
      logged_in: req.session.logged_in
>>>>>>> a83a11e (adding assets)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders create post page
<<<<<<< HEAD
router.get('/post/new', async (req, res) => {
  try {
    const categoryData = await Category.findAll();

    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );

    res.render('create-post', {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log('post', post);

    const comments = post.comments;
    console.log('comments', comments);

    // TODO: render page name
    res.render('view-post', {
      post,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
=======
router.get('/post/new', withAuth, async (req, res) => {
  res.render('create-post');
>>>>>>> a83a11e (adding assets)
});

// renders edit post page
router.get('/post/:id/edit', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Category,
<<<<<<< HEAD
          attributes: ['name'],
        },
      ],
=======
          attributes: ['name']
        }
      ]
>>>>>>> a83a11e (adding assets)
    });

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      post,
<<<<<<< HEAD
      logged_in: req.session.logged_in,
=======
      logged_in: req.session.logged_in
>>>>>>> a83a11e (adding assets)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders profile page, sends all posts created by current user
router.get('/profile', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
<<<<<<< HEAD
          attributes: ['username'],
        },
        {
          model: Category,
          attributes: ['name'],
=======
          attributes: ['username']
        },
        {
          model: Category,
          attributes: ['name']
>>>>>>> a83a11e (adding assets)
        },
      ],
      where: { user_id: req.session.user_id }
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    const categoryData = await Category.findAll({});

<<<<<<< HEAD
    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );
=======
    const categories = categoryData.map((category) => category.get({ plain: true }));
>>>>>>> a83a11e (adding assets)
    console.log(posts);
    res.render('profile', {
      posts,
      categories,
      logged_in: true,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

// renders signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('signup');
});

module.exports = router;
