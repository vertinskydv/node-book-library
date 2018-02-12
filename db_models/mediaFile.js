module.exports = (sequelize, DataTypes) => {
    let mediaFile = sequelize.define('mediaFile', {
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

    mediaFile.associate = (models) => {
        mediaFile.belongsTo(models.book, {
            onDelete: 'CASCADE'
        });
    };

    return mediaFile;
};

