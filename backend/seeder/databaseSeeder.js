const permissionTableSeeder = require('./permissionTableSeeder');
const roleTableSeeder = require('./roleTableSeeder');
const userTableSeeder = require('./userTableSeeder');

const dbSeeder = async () => {
    const permissions = await permissionTableSeeder();
    const role = await roleTableSeeder(permissions);
    await userTableSeeder(role);
}

module.exports = dbSeeder;