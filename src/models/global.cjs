const PORT = process.env.PORT || 8080;
const TITLE = process.env.TITLE || 'Untitled';
const DATABASE_URL = process.env.DATABASE_URL;
const IS_PRODUCTION = process.env.ENV === 'Production';
const SESSION_SECRET = process.env.SESSION_SECRET;

if(!DATABASE_URL){
    console.error('Database URL not found in env file');
    process.exit(1);
}

if(!SESSION_SECRET){
    console.error('Session secret not found in env file');
    process.exit(1);
}

const globals = { PORT, TITLE, DATABASE_URL, IS_PRODUCTION, SESSION_SECRET };

module.exports = globals;