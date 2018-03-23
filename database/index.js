const Sequelize = require('sequelize');
const config = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const connectionUrl = config[NODE_ENV].url;

const database = new Sequelize(connectionUrl, {
    logging: false
});

module.exports = database;
