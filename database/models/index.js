const fs = require('fs');
const path = require('path');
const database = require('../index');

const models = fs.readdirSync(__dirname)
    .filter(modelFile => modelFile !== path.basename(__filename))
    .reduce((models, modelFile) => {
        const modelName = path.basename(modelFile, '.js');
        models[modelName] = database.import(modelFile);
        return models;
    }, {});

module.exports = models;
