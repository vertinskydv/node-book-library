module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
        name: DataTypes.STRING
    });

    role.associate = (models) => {
        role.belongsTo(models.user);
    };

    return role;
};

