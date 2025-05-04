const User = require('../models/userModel');
const userSeeder = async (role) => {
    await User.deleteMany({});
    await User.create({
        name: 'Super Admin',
        email: 'admin@gmail.com',
        password: 'admin12345',
        role_id: role._id
    });
};

module.exports = userSeeder;