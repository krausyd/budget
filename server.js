const express = require('express');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');

const hbs = exphbs.create({});

const sequelize = require('./config/connection'); //we are importing our database connection

const app = express();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
const PORT = process.env.PORT || 3001; // process.env.port is a setting in Heroku. We don't know what port is going to use Heroku, so we need to grab it from the environment variables in Heroku

const sessionSettings = {
    secret: 'Super secret secret secret oh secret',
    resave: false,
    saveUninitialized: true,
};
app.use(session(sessionSettings));

// we need to setup a middleware to serve static files (such as .js, .css, images, and so)
app.use(express.static(path.join(__dirname, 'public'))); // Using path package to get the absolute path to our public folder. In local (with mac) would be something like /users/karina/Trilogy/Budget/public
app.use(routes);

// Sequelize sync will open the connection to our database, and also will recreate the tables if force is set to true
// if force is set to true, sequelize will do a DROP table and CREATE table each time we run the application
// once the tables have been created and populated (with seeds), change the force to false, so your data is not lost
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App started in Port ${PORT}`);
    })
});