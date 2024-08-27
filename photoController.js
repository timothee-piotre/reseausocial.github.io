// controllers/photoController.js
const Photo = require('../models/Photo');

exports.uploadPhoto = async (req, res) => {
    const { filePath, isAnonymous } = req.body;

    try {
        const photo = await Photo.create({
            uploaderId: req.user.id,
            groupId: req.params.groupId,
            filePath,
            isAnonymous,
        });
        res.status(201).json(photo);
    } catch (error) {
        res.status(400).json({ message: 'Photo could not be uploaded', error: error.message });
    }
};
