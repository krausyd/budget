const sequelize = require('../config/connection');
const { Category, User } = require('../models');
const categories = require('./categories.json');

const seedDatabase = async() => {
    await sequelize.sync({ force: true });
    await Category.bulkCreate(categories);

    await User.create({
        name: 'Karina',
        email: 'krausyd@hey.com',
        password: 'superSafePassword',
    });
};

seedDatabase();