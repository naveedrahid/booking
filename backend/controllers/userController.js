const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const user = {

    getUsers: async (req, res) => {
        try {
            const users = await User.find({ is_deleted: false });
            res.json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const users = await User.findById(id).where({ is_deleted: false });
            if (!users) return res.status(404).json({ message: 'User not found' });
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const existingUsers = await User.countDocuments();

            // Token required if at least one user exists
            if (existingUsers > 0 && !req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token',
                });
            }

            const user = await User.create(req.body);
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: user,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'User creation failed',
                error: error.message,
            });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const user = await User.findOne({ _id: id, is_deleted: false });

            if (!user) return res.status(404).json({ message: 'User not found' });

            if (name) user.name = name;
            if (email) user.email = email;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }

            await user.save();

            return res.status(200).json({
                message: 'User updated successfully',
                data: user
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Error updating user',
                error: error.message
            });
        }
    },

    delete: async (req, res) => {
        try {

            const { id } = req.params;
            const deleteUser = await User.findById(id);
            if (!deleteUser || deleteUser.is_deleted) return res.status(404).json({ message: 'User not found or already deleted' });

            deleteUser.is_deleted = true;
            deleteUser.deleted_at = new Date();

            await deleteUser.save();
            return res.status(200).json({
                message: 'Role deleted successfully',
                data: deleteUser
            });

        } catch (error) {
            res.status(500).json({
                message: 'Error deleting role',
                error: error.message
            });
        }
    },
}

module.exports = user;