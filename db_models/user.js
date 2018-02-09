module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define('user', {
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        patronymic: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        email: DataTypes.STRING
    });

    user.associate = (models) => {
        user.hasOne(models.auth);
        user.hasOne(models.reader);
        user.hasOne(models.role);
    };

    return user;
};
