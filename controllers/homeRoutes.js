const router = require('express').Router();
const { User, Category, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// renders homepage, limits posts to 20

router.get('/', async (req, res) =>
{
    try
    {
        const postData = await Post.findAll({
            limit: 20,
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err)
    {
        res.status(500).json(err);
    }
});

// renders page with posts filtered by categories
router.get('/category/:id', async (req, res) =>
{
    try
    {
        const postData = await Post.findAll({
            where: { category_id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Category
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        // TODO: render page name
        res.render('category', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err)
    {
        res.status(500).json(err);
    }
});

<<<<<<< Updated upstream
  // renders create post page
router.get('/post/new', withAuth, async (req, res) =>
{
    res.render('create-post');
});
  
=======
// renders create post page
router.get('/post/new', async (req, res) =>
{
    try
    {
        const categoryData = await Category.findAll();

        const categories = categoryData.map((category) => category.get({ plain: true }));

        res.render('create-post', {
            categories,
            logged_in: req.session.logged_in
        });
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});

>>>>>>> Stashed changes
// renders single post

router.get('/post/:id', async (req, res) =>
{
    try
    {
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
        });
    } catch (err)
    {
        res.status(500).json(err);
    }
});

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
// renders edit post page
router.get('/post/:id/edit', withAuth, async (req, res) =>
{
    try
    {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Category
                }
            ]
        });

        const categoryData = await Category.findAll();

        const post = postData.get({ plain: true });
        const categories = categoryData.map((category) => category.get({ plain: true }));

        res.render('edit-post', {
            post,
            categories,
            logged_in: req.session.logged_in
        });
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});

// renders profile page, sends all posts created by current user
router.get('/profile', withAuth, async (req, res) =>
{
    try
    {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Category,
                    attributes: ['name']
                },
            ],
            //where: { user_id: req.session.user_id }
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        const categoryData = await Category.findAll({});

        const categories = categoryData.map((category) => category.get({ plain: true }));
        console.log(posts);
        res.render('profile', {
            posts,
            categories,
            logged_in: true,
            username: req.session.username,
        });
    } catch (err)
    {
        res.status(500).json(err);
    }
});

// renders login page
router.get('/login', (req, res) =>
{
    if (req.session.logged_in)
    {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

// renders signup page
router.get('/signup', (req, res) =>
{
    if (req.session.logged_in)
    {
        res.redirect('/profile');
        return;
    }
    res.render('signup');
})

module.exports = router;

