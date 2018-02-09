const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const DB = require('../global/config').db[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(DB.name, DB.user, DB.password, {
    host: DB.host,
    dialect: 'mysql',
    operatorsAliases: 'Op' // use Sequelize.Op
});

let db = {};
const indexFileName = path.basename(__filename);

fs.readdirSync(__dirname).filter(fileName => (
    fileName !== indexFileName
)).forEach((fileName) => {
    const model = sequelize.import(path.join(__dirname, fileName));
    db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
