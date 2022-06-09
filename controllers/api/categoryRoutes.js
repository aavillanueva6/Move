const router = require('express').Router();
const { Category } = require('../../models');

// gets all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();

<<<<<<< HEAD
    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );
=======
    const categories = categoryData.map((category) => category.get({ plain: true }));
>>>>>>> a83a11e (adding assets)
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
