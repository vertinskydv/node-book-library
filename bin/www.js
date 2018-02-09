process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let app = require('./../app');
const models = require('../db_models');

models.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('App listening on port 3000!');
    });
});
