const fs = require('fs');

exports.uploadFiles = async (req, res) => {
    try {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            const { path, originalname } = req.files[i];
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
            uploadedFiles.push(newPath.replace('uploads', ''));
        }
        res.json(uploadedFiles);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};