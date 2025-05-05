const Role = require('../models/roleModel');

const roleSeeder = async (permissions) => {
    await Role.deleteMany({});
    const superAdmin = await Role.create({
        name:'super-admin',
        permissions: permissions.map(p => p._id)
    });

    return superAdmin;
}

module.exports = roleSeeder;