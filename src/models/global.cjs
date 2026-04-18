const PORT = process.env.PORT || 8080;
const TITLE = process.env.TITLE || 'Untitled';
const DATABASE_URL = process.env.DATABASE_URL;
const ENV = process.env.ENV || 'development';
const IS_PRODUCTION = ENV === 'production';
const SESSION_SECRET = process.env.SESSION_SECRET;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

function checkAndExit(value, errMessage){
    if(!value){
        console.error(errMessage);
        process.exit(1);
    }
}

checkAndExit(DATABASE_URL, 'Database URL not found in env file');
checkAndExit(SESSION_SECRET, 'Session secret not found in env file');


const globals = { 
    PORT, 
    TITLE, 
    DATABASE_URL, 
    ENV, 
    IS_PRODUCTION, 
    SESSION_SECRET, 
    SALT_ROUNDS,
};

module.exports = globals;