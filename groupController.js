// controllers/groupController.js
const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
    const { name } = req.body;

    try {
        const group = await Group.create({
            name,
            adminId: req.user.id,
        });
        await group.addUser(req.user.id); // Add the creator as a member
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ message: 'Group could not be created', error: error.message });
    }
};

exports.joinGroup = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        const user = req.user;

        // Check if the user is already a member
        const isMember = await group.hasUser(user.id);
        if (isMember) return res.status(400).json({ message: 'Already a member' });

        await group.addUser(user.id);
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: 'Cannot join group', error: error.message });
    }
};
