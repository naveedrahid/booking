const Permission = require('../models/permissionModel');

const permissionSeeder = async () => {
    await Permission.deleteMany({});

    const permissions = await Permission.create([
        {
            name: 'view_user',
            method: 'GET',
            route: '/user',
            description: 'Get all users',
        },
        {
            name: 'view_user_by_id',
            method: 'GET',
            route: '/user/:id',
            description: 'Get a single user by ID',
        },
        {
            name: 'create_user',
            method: 'POST',
            route: '/user',
            description: 'Create a new user',
        },
        {
            name: 'update_user',
            method: 'PUT',
            route: '/user/:id',
            description: 'Update a user by ID',
        },
        {
            name: 'delete_user',
            method: 'DELETE',
            route: '/user/:id',
            description: 'Delete a user by ID',
        },
    ]);

    return permissions;
};

module.exports = permissionSeeder;