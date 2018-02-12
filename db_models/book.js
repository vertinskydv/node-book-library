module.exports = (sequelize, DataTypes) => {
    const book = sequelize.define('book', {
        name: DataTypes.STRING,
        coverUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        pagesCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        year: {
            type: DataTypes.INTEGER,
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
            allowNull: true,
            defaultValue: null
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    });

    book.associate = (models) => {
        book.hasOne(models.mediaFile, {
            onDelete: 'CASCADE'
        });
    };

    return book;
};

