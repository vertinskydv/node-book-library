const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const librarianRoutes = require('./routes/librarian');
const passportMiddleware = require('./middlewares/passport');
const sessionMiddleware = require('./middlewares/session');
const fileUpload = require('express-fileupload');

let app = express();

app.use(sessionMiddleware);
app.use(passportMiddleware);

app.use(express.static('./public'));
app.use(express.static('./uploads'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());

app.use(userRoutes);
app.use('/admin', adminRoutes);
app.use('/librarian', librarianRoutes);

module.exports = app;
