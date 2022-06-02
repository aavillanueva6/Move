const router = require('express').Router();
const { User, Category, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// renders homepage
router.get('/', async (req, res) => {});

// renders page with posts filtered by categories
router.get('/category/:id', async (req, res) => {
    try {
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

        // TODO: name of render page
        res.render('category', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// renders single post
router.get('/post/:id', async (req, res) => {});

// renders profile page
router.get('/profile', withAuth, async (req, res) => {
    try {} catch (err) {}
});

module.exports = router;