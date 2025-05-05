const Permission = require('../models/permissionModel');

const permissionSeeder = async () => {
    await Permission.deleteMany({});

    const permissions = await Permission.create([
        {
            name: 'view_user',
            method: 'GET',
            route: '/user',
        },
        {
            name: 'view_user_by_id',
            method: 'GET',
            route: '/user/:id',
        },
        {
            name: 'create_user',
            method: 'POST',
            route: '/user',
        },
        {
            name: 'update_user',
            method: 'PUT',
            route: '/user/:id',
        },
        {
            name: 'delete_user',
            method: 'DELETE',
            route: '/user/:id',
        },

        /* Role Permissions*/ 

        {
            name: 'view_role',
            method: 'GET',
            route: '/roles',
        },
        {
            name: 'view_role_by_id',
            method: 'GET',
            route: '/roles/:id',
        },
        {
            name: 'create_role',
            method: 'POST',
            route: '/roles',
        },
        {
            name: 'update_role_by_id',
            method: 'PUT',
            route: '/roles/:id',
        },
        {
            name: 'remove_role_by_id',
            method: 'PATCH',
            route: '/roles/:id',
        },
        {
            name: 'update_role',
            method: 'PATCH',
            route: '/roles/:id/remove-permission',
        },
        {
            name: 'delete_role',
            method: 'DELETE',
            route: '/roles/:id',
        },

        /* Permission */
        
        {
            name: 'view_permission',
            method: 'GET',
            route: '/permissions',
        },
        {
            name: 'view_permission_by_id',
            method: 'GET',
            route: '/permissions/:id',
        },
        {
            name: 'create_permission',
            method: 'POST',
            route: '/permissions',
        },
        {
            name: 'update_permission',
            method: 'PUT',
            route: '/permissions/:id',
        },
        {
            name: 'delete_permission',
            method: 'DELETE',
            route: '/permissions/:id',
        },
    ]);

    return permissions;
};

module.exports = permissionSeeder;