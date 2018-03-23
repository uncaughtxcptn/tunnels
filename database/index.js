require('dotenv').config();
const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
    logging: false
});

module.exports = database;
