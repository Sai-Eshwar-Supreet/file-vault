const expressSession = require('express-session');
const globals = require('../models/global.cjs');
const {PrismaSessionStore} = require('@quixo3/prisma-session-store')
const prisma = require('./prisma.cjs');

function configureSession(app){

    const store = new PrismaSessionStore(prisma, {
        checkPeriod: 15 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
    });

    const cookie = {
        maxAge: 24 * 60 * 60 * 1000 , //ms
        secure: globals.IS_PRODUCTION,
        httpOnly: true,
        sameSite: 'lax'
    };

    const session = expressSession({
        secret: globals.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie,
        store,
    });

    app.use(session);
}

module.exports = configureSession;