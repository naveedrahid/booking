const app = require('./server/app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
// const dbSeeder = require('./seeder/databaseSeeder');

dotenv.config();
// connectDB().then(async () => {
//     if (process.env.NODE_ENV !== 'production') {
//         await dbSeeder();
//         console.log('seeder running completed');
//     }

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

connectDB()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));