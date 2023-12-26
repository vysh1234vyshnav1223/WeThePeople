const Project = require('../models/Project');

exports.getAutocompleteSuggestions = async (req, res) => {
    try {
        const query = req.query.query;
        const regex = new RegExp(`^${query}`, 'i');

        const suggestions = await Project.find({ title: { $regex: regex } }).select('title images');

        res.json(suggestions);
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

