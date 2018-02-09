module.exports = (sequelize, DataTypes) => {
    let media = sequelize.define('media', {
        eBook: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
            get() {
                return JSON.parse(this.getDataValue('eBook'));
            },
            set(val) {
                this.setDataValue('eBook', JSON.stringify(val));
            }
        },
        audioBook: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
            get() {
                return JSON.parse(this.getDataValue('audioBook'));
            },
            set(val) {
                this.setDataValue('audioBook', JSON.stringify(val));
            }
        }
    });

    media.associate = (models) => {
        media.belongsTo(models.book, {
            onDelete: 'CASCADE'
        });
    };

    return media;
};

