const models = require('../db_models');
const router = require('express').Router();
const path = require('path');

router.post('/upload', async (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.upload;

    sampleFile.mv(path.normalize(path.join(__dirname, '/..', '/uploads/', sampleFile.name)), (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({message: 'File uploaded!'});
        return true;
    });
    return true;
});

router.post('/book', async (req, res) => {
    req.body.year = Number(req.body.year);
    req.body.pagesCount = Number(req.body.pagesCount);
    const values = req.body;
    const options = {};
    if (req.body.eBook || req.body.audioBook) {
        values.media = {};
        if (req.body.eBook) {
            values.media.eBook = path.normalize(path.join(__dirname, '/..', '/uploads/', req.body.eBook));
        }
        if (req.body.audioBook) {
            values.media.audioBook = path.normalize(path.join(__dirname, '/..', '/uploads/', req.body.audioBook));
        }
        options.include = [];
        options.include.push(models.media);
    }
    let book = await models.book.create(values, {
        include: models.media
    });


    if (!book) {
        res.status(500).send('Error when adding an book to the database.');
    }
    res.sendStatus(200);
});

module.exports = router;
