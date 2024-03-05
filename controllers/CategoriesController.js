const Category = require('../models/Categories');

// Create a new category
const createCategory = async (req, res) => {
    const { name, language } = req.body;
    try {
        await Category.create({ name, language });
        res.send({ status: "Category Successfully created" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch a new category
const fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const fetchCategoriesByLanguage = async (req, res) => {
    const { language } = req.params;
    try {
        const categories = await Category.find({ language });
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getCategory = async (req, res) => {
    const { id } = req.params; // Assuming you pass the document id as a parameter in the request

    try {
        const categoryFetched = await Category.findById(id)
        res.json(categoryFetched);
    } catch (error) {
        res.json({ status: error });
    }

}

// Update a category by ID
const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name, language } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name, language }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json({ status: "Category Successfully updated", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json({ status: "Category Successfully deleted", category: deletedCategory });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    fetchCategories,
    fetchCategoriesByLanguage,
    getCategory
};
