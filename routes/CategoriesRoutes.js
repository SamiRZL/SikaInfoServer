const express = require('express');
const router = express.Router();
const { fetchCategoriesByLanguage, createCategory, getCategory, updateCategory, deleteCategory, fetchCategories } = require('../controllers/CategoriesController');


router.post('/', createCategory);

router.get('/all-categories', fetchCategories);
router.get('/all-categories/:language', fetchCategoriesByLanguage);

router.put('/:id', updateCategory);
router.get('/:id', getCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
