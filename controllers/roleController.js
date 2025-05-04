const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');

const role = {

    view: async (req, res) => {
        try {
            const viewRoles = await Role.find({ is_deleted: false });
            if (!viewRoles || viewRoles.length === 0) return res.status(404).json({ message: 'No roles found' });
            res.json(viewRoles);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    viewById: async (req, res) => {
        try {
            const viewRoles = await Role.findById(req.params.id).where({ is_deleted: false });
            if (!viewRoles) return res.status(404).json({ message: 'Role not found' });
            res.json(viewRoles);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching role',
                error: error.message
            });
        }
    },

    create: async (req, res) => {
        try {
            const { name, permissions } = req.body;
            if (!permissions || !Array.isArray(permissions) || permissions.length === 0) {
                return res.status(400).json({ message: 'Permissions are required and must be a non-empty array' });
            }

            const newRole = await Role.create({ name, permissions });
            res.status(201).json({
                message: 'Role created successfully',
                data: newRole
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    assignPersmission: async (req, res) => {
        try {
            const roleId = req.params.id;
            const permissions = Array.isArray(req.body.permissions) ? req.body.permissions : [req.body.permissions];
            const role = await Role.findById(roleId);

            if (!role) return res.status(404).json({ message: 'Role not found' });

            const isAlreadyAssigned = permissions.some(p => role.permissions.includes(p));
            if (isAlreadyAssigned) {
                return res.status(400).json({ message: 'Permissions are already assigned to the role' });
            }

            for (const permissionId of permissions) {
                const exists = await Permission.findById(permissionId);
                if (!exists) {
                    return res.status(400).json({
                        message: `Permission with ID ${permissionId} does not exist`,
                    });
                }

                if (!role.permissions.includes(permissionId)) {
                    role.permissions.push(permissionId);
                }
            }

            role.permissions.push(...permissions);
            await role.save();

            res.status(200).json({
                message: 'Permissions successfully assigned to role',
                data: role
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    unAssignPersmission: async (req, res) => {
        try {
            const roleId = req.params.id;
            const permissions = Array.isArray(req.body.permissions) ? req.body.permissions : [req.body.permissions];
            const role = await Role.findById(roleId);
            if (!role) return res.status(404).json({ message: 'Role not found' });

            const notExist = permissions.filter(p => !role.permissions.includes(p));
            if (notExist.length > 0) {
                return res.status(400).json({
                    message: 'Some permissions do not exist in the role',
                    notAssigned: notExist
                });
            }

            permissions.forEach(permissionId => {
                const index = role.permissions.indexOf(permissionId);
                if (index > -1) {
                    role.permissions.splice(index, 1);
                }
            });

            await role.save();
            res.status(200).json({ message: 'Unassign permissions successfully', data: role });

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, permissions } = req.body;

            const updateRole = await Role.findByIdAndUpdate(
                id,
                {
                    name,
                    permissions
                },
                {
                    new: true,
                    runValidators: true
                }
            ).where({ is_deleted: false });

            if (!updateRole) return res.status(404).json({ message: 'Role not found' });

            return res.status(200).json({
                message: 'Role updated successfully',
                data: updateRole
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Error updating role',
                error: error.message
            })
        }
    },

    delete: async (req, res) => {
        try {

            const { id } = req.params;
            const deleteRole = await Role.findById(id);
            if (!deleteRole || deleteRole.is_deleted) return res.status(404).json({ message: 'Role not found or already deleted' });

            deleteRole.is_deleted = true;
            deleteRole.deleted_at = new Date();

            await deleteRole.save();
            return res.status(200).json({
                message: 'Role deleted successfully',
                data: deleteRole
            });

        } catch (error) {
            res.status(500).json({
                message: 'Error deleting role',
                error: error.message
            });
        }
    },
}

module.exports = role;
