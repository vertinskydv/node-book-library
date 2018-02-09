module.exports = (sequelize, DataTypes) => {
    let media = sequelize.define('media', {
        eBook: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        audioBook: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        }
    });

    media.associate = (models) => {
        media.belongsTo(models.book, {
            onDelete: 'CASCADE'
        });
    };

    return media;
};

