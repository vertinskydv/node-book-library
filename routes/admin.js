const bcrypt = require('bcrypt');
const consts = require('../global/consts');
const models = require('../db_models');
const router = require('express').Router();
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

router.get('/users', async (req, res) => {
    const users = await models.user.findAll({
        where: {id: {[Op.ne]: req.user.id}},
        include: [models.role, models.reader]
    });
    res.status(200).send(users);
});

router.post('/user/update', async (req, res) => {
    const user = await models.user.findById(req.body.id, {include: models.role});
    if (!user) {
        res.status(500).send('Database request error.');
    }
    user.set({
        name: req.body.name,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        email: req.body.email
    });
    if (req.body.role) {
        user.role.set({
            name: req.body.role
        });
    }
    user.save();
    user.role.save();

    res.send(user);
});

router.post('/user/add', async (req, res) => {
    const existingUser = await models.user.findOne({where: {email: req.body.email}});
    if (existingUser) {
        res.status(409).send('A user with this email already exists.');
        return;
    }
    const hash = await bcrypt.hash(req.body.password, consts.saltRounds);
    req.body.hash = hash;
    req.body.role = req.body.role || 'reader';

    const valuesObj = {
        ...req.body,
        auth: req.body,
        role: {name: req.body.role}
    };
    const optionsObj = {
        include: [models.auth, models.role]
    };
    if (req.body.role === 'reader') {
        valuesObj.reader = {
            passportNum: req.body.passportNum,
            birthDate: req.body.birthDate,
            address: req.body.address,
            phone: req.body.phone,
            phone2: req.body.phone2,
            phone3: req.body.phone3,
            phone4: req.body.phone4,
            readerСard: req.body.readerСard
        };
        optionsObj.include.push(models.reader);
    }

    const user = await models.user.create(valuesObj, optionsObj);

    if (!user) {
        res.status(500).send('Error when adding an account to the database.');
    }
    res.sendStatus(200);
});

router.get('/user/reader/:id', async (req, res) => {
    const reader = await models.reader.findById(req.params.id);
    if (!reader) {
        res.status(500).send('Database request error.');
    }
    res.send(reader);
});

router.patch('/user/reader/:id/', async (req, res) => {
    const reader = await models.reader.findById(req.params.id);
    if (!reader) {
        res.status(500).send('Database request error.');
    }
    const key = Object.keys(req.body)[0];
    reader[key] = req.body[key];
    reader.save();
    res.send(reader);
});


module.exports = router;
