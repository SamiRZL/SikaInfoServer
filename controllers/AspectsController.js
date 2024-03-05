const Aspect = require('../models/Aspects');

// Create a new aspect
const createAspect = async (req, res) => {
    const { name, language } = req.body;
    try {
        await Aspect.create({ name, language });
        res.send({ status: "Aspect Successfully created" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Fetch aspects
const fetchAspects = async (req, res) => {
    try {
        const aspects = await Aspect.find({});
        res.json({ aspects });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAspectsByLanguage = async (req, res) => {
    try {
        const { language } = req.params; // Assuming you pass the language as a parameter in the request

        // Modify the query based on your schema structure
        // Assuming there is a language property in the Aspect model
        const aspects = await Aspect.find({ language: language });

        res.json({ aspects });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a aspect by ID
const updateAspect = async (req, res) => {
    const aspectId = req.params.id;
    const { name, language } = req.body;

    try {
        const updatedAspect = await Aspect.findByIdAndUpdate(aspectId, { name, language }, { new: true });
        if (!updatedAspect) {
            return res.status(404).json({ error: "Aspect not found" });
        }
        res.json({ status: "Aspect Successfully updated", aspect: updatedAspect });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAspect = async (req, res) => {
    const { id } = req.params; // Assuming you pass the document id as a parameter in the request

    try {
        const aspectFetched = await Aspect.findById(id)
        res.json(aspectFetched);
    } catch (error) {
        res.json({ status: error });
    }

}

// Delete a aspect by ID
const deleteAspect = async (req, res) => {
    const aspectId = req.params.id;

    try {
        const deletedAspect = await Aspect.findByIdAndDelete(aspectId);
        if (!deletedAspect) {
            return res.status(404).json({ error: "Aspect not found" });
        }
        res.json({ status: "Aspect Successfully deleted", aspect: deletedAspect });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createAspect,
    updateAspect,
    deleteAspect,
    fetchAspects,
    getAspectsByLanguage,
    getAspect
};
