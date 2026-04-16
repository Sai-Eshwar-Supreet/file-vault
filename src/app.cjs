require('dotenv').config();

const express = require('express');
const globals = require('./models/global.cjs');
const {errorMiddleware} = require('./middlewares/errorMiddleware.cjs');
const path = require('node:path');

const app = express();

// ==================== SETUP ====================
app.set('trust proxy', 1);

require('./configs/views.cjs')(app, path.join(__dirname, 'views'));
require('./configs/session.cjs')(app);
require('./configs/passport.cjs')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// ==================== ROUTING ====================
app.use('/', require('./routes/indexRouter.cjs'));

app.use((req,res, next) => {
    next(Object.assign(new Error('Path not found'), {status: 404}));
});

// ==================== ERROR HANDLING ====================
app.use(errorMiddleware);

// ==================== LISTEN ====================

app.listen(globals.PORT, err => {
    if(err) throw err;

    console.log(`Listening to port : ${globals.PORT}`)
});