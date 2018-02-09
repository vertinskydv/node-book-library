const models = require('../db_models');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const consts = require('../global/consts');
const passport = require('passport');
const authMiddleware = require('./../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    const existingUser = await models.user.findOne({where: {email: req.body.email}});
    if (existingUser) {
        res.status(409).send('A user with this email already exists.');
        return;
    }
    const hash = await bcrypt.hash(req.body.password, consts.saltRounds);
    req.body.hash = hash;
    req.body.role = req.body.role || 'reader';

    const user = await models.user.create({
        ...req.body,
        auth: req.body,
        role: {name: req.body.role}
    }, {
        include: [models.auth, models.role]
    });

    if (!user) {
        res.status(500).send('Error when adding an account to the database.');
    }
    res.sendStatus(200);
});

router.post('/login', passport.authenticate('local'), async (req, res) => {
    const user = await models.user.findById(req.user.id, {include: models.role});
    res.status(200).send(user);
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});
router.get('/state', authMiddleware, (req, res) => {
    res.status(200).send(req.user);
});

router.get('/roles', authMiddleware, async (req, res) => {
    const roles = await models.role.findAll();
    if (!roles) {
        res.status(500).send('No user role information');
        return;
    }
    res.send(roles.map(roleObj => roleObj.name));
});


module.exports = router;
