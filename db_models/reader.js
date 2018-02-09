module.exports = (sequelize, DataTypes) => {
    let reader = sequelize.define('reader', {
        passportNum: DataTypes.STRING,
        birthDate: DataTypes.DATEONLY,
        address: DataTypes.STRING,
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        phone2: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        phone3: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        phone4: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        readerСard: DataTypes.STRING
    });

    reader.associate = (models) => {
        reader.belongsTo(models.user, {
            onDelete: 'CASCADE'
        });
    };

    return reader;
};
