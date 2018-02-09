module.exports = (sequelize, DataTypes) => {
    let auth = sequelize.define('auth', {
        hash: DataTypes.STRING
    });

    auth.associate = (models) => {
        auth.belongsTo(models.user, {
            onDelete: 'CASCADE'
        });
    };

    return auth;
};
