const PORT = process.env.PORT || 8080;
const TITLE = process.env.TITLE || 'Untitled';
const DATABASE_URL = process.env.DATABASE_URL;
const IS_PRODUCTION = process.env.ENV === 'production';
const SESSION_SECRET = process.env.SESSION_SECRET;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

if(!DATABASE_URL){
    console.error('Database URL not found in env file');
    process.exit(1);
}

if(!SESSION_SECRET){
    console.error('Session secret not found in env file');
    process.exit(1);
}

const globals = { PORT, TITLE, DATABASE_URL, ENV, IS_PRODUCTION, SESSION_SECRET, SALT_ROUNDS };

module.exports = globals;