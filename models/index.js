const User = require('./User');
const Category = require('./Category');
const Expense = require('./Expense');

Category.hasMany(Expense, {
    foreignKey: 'category_id',
    onDelete: 'SET DEFAULT',
});

Expense.belongsTo(Category, {
    foreignKey: 'category_id',
});

User.hasMany(Expense, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', //delete all the expenses for an user if the user is deleted in the User table
});

Expense.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { Category, User, Expense };