const router = require('express').Router();
const { Category } = require('../../models');

// gets all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();

    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
