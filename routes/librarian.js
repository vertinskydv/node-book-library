const models = require('../db_models');
const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const coverDir = path.normalize(path.join(__dirname, '/..', '/uploads/covers'));
const eBookDir = path.normalize(path.join(__dirname, '/..', '/uploads/eBooks'));
const audioBookDir = path.normalize(path.join(__dirname, '/..', '/uploads/audioBooks'));

/**
 * loading media files in a book (cover, electronic book, audio book)
 */
router.post('/upload/:type', async (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let filePath;
    let file = req.files.upload;

    switch (req.params.type) {
        case 'cover':
            filePath = coverDir;
            break;
        case 'ebook':
            filePath = eBookDir;
            break;
        case 'audiobook':
            filePath = audioBookDir;
            break;
        default:
            res.status(500).send({message: 'Incorrect upload URL'});
    }

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }

    file.mv(path.join(filePath, file.name), (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({message: 'File uploaded!'});
        return true;
    });
    return true;
});

/**
 * create an entry with information about the book
 * add timestamp to filename
 */
router.post('/book', async (req, res) => {
    const timestamp = `${Date.now()}-${req.user.id}`;
    function addTimestamp(fileName, filePath) {
        let timestampFileName = `${path.basename(fileName, path.extname(fileName))}_${timestamp}${path.extname(fileName)}`;
        fs.renameSync(path.join(filePath, fileName), path.join(filePath, timestampFileName));
        return path.relative(path.join(__dirname, '../uploads'), path.join(filePath, timestampFileName));
    }
    req.body.year = Number(req.body.year);
    req.body.pagesCount = Number(req.body.pagesCount);
    const values = req.body;
    const options = {};

    if (req.body.cover) {
        req.body.coverUrl = addTimestamp(req.body.cover, coverDir);
    }
    if (req.body.eBook || req.body.audioBook) {
        values.mediaFile = {};
        if (req.body.eBook) {
            values.mediaFile.eBook = addTimestamp(req.body.eBook, eBookDir);
        }
        if (req.body.audioBook) {
            values.mediaFile.audioBook = addTimestamp(req.body.audioBook, audioBookDir);
        }
        options.include = [];
        options.include.push(models.mediaFile);
    }
    let book = await models.book.create(values, options);

    if (!book) {
        res.status(500).send('Error when adding an book to the database.');
    }
    res.sendStatus(200);
});

module.exports = router;
