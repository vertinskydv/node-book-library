module.exports = (sequelize, DataTypes) => (
    sequelize.define('book', {
        name: DataTypes.STRING,
        coverUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        pagesCount: {
            type: DataTypes.TINYINT(5),
            allowNull: true,
            defaultValue: null
        },
        year: {
            type: DataTypes.TINYINT(5),
            allowNull: true,
            defaultValue: null
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        authorSurname: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        authorPatronymic: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        publishingHouse: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        publishingCountry: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        genre: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('genre').split(';');
            },
            set(val) {
                this.setDataValue('genre', val.join(';'));
            }
        }
    })
);

