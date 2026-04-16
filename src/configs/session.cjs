const expressSession = require('express-session');
const globals = require('../models/global.cjs');
const PgStore = require('connect-pg-simple')(expressSession);
const { Pool } = require('pg');

function configureSession(app){

    const pool = new Pool({
        connectionString: globals.DATABASE_URL,
    });

    const store = new PgStore({
        pool,
        tableName: 'user_session',
        createTableIfMissing: true,
    });

    const cookie = {
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