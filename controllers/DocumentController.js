const multer = require("multer");
const Document = require('../models/Document');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


const uploadDocument = async (req, res) => {
    const aspect = req.body.aspect;
    const category = req.body.category;
    const title = req.body.title;
    const fileName = req.file.filename;
    const language = req.body.language;
    try {
        await Document.create({ title: title, pdf: fileName, aspect, category, language });
        res.send({ status: "Pdf Successfully uploaded" });
    } catch (error) {
        res.json({ status: error });
    }
};

const getDocuments = async (req, res) => {

    try {
        Document.find({}).populate('aspect').populate('category').then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        res.json({ status: error });
    }

}
const getDocument = async (req, res) => {
    const { id } = req.params; // Assuming you pass the document id as a parameter in the request

    try {
        Document.findById(id).populate('aspect').populate('category').then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        res.json({ status: error });
    }

}

const updateDocument = async (req, res) => {
    const { id } = req.params; // Assuming you pass the document id as a parameter in the request
    const { aspect, category, title, language, fileName } = req.body;

    try {
        // Assuming you want to update the document with the provided id
        const updatedDocument = await Document.findByIdAndUpdate(
            id,
            { title, aspect, category, language, pdf: fileName },
            { new: true } // Return the updated document
        );

        if (!updatedDocument) {
            return res.status(404).json({ error: "Document not found" });
        }

        res.json({ status: "Document Successfully updated", document: updatedDocument });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getDocumentsByLanguage = async (req, res) => {
    try {
        const { language } = req.params; // Assuming you pass the language as a parameter in the request

        Document.find({ language: language }).populate('aspect').populate('category').then((data) => {
            if (data.length === 0) {
                res.send({ status: "error", message: "No documents found for the specified language." });
            } else {
                res.send({ status: "ok", data: data });
            }
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getDocumentsByAspect = async (req, res) => {
    try {
        const { aspectId } = req.params; // Assuming you pass aspectId as a parameter in the request

        Document.find({ aspect: aspectId }).populate('aspect').populate('category').then((data) => {
            if (data.length === 0) {
                res.send({ status: "error", message: "No documents found for the specified aspectId." });
            } else {
                res.send({ status: "ok", data: data });
            }
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getDocumentsByAspectAndCategory = async (req, res) => {
    const aspectId = req.params.aspectId; // Assuming you pass aspectId in the URL parameters
    const categoryId = req.params.categoryId; // Assuming you pass categoryId in the URL parameters

    try {

        Document.find({ aspect: aspectId, category: categoryId }).populate('aspect').populate('category').then((data) => {
            if (data.length === 0) {
                res.send({ status: "error", message: "No documents found for the specified aspectId and category." });
            } else {
                res.send({ status: "ok", data: data });
            }
        });
    } catch (error) {
        res.json({ status: error });
    }
};

const deleteDocument = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedDocument = await Document.findByIdAndDelete(id);
        if (!deletedDocument) {
            return res.status(404).json({ error: "Aspect not found" });
        }
        res.json({ status: "Document Successfully deleted", document: deletedDocument });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getDocument, updateDocument, getDocumentsByLanguage, uploadDocument, upload, getDocuments, getDocumentsByAspect, getDocumentsByAspectAndCategory, deleteDocument };


