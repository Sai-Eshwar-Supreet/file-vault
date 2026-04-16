const globals = require("../models/global.cjs");

function errorMiddleware(err, req, res, next){
    if(res.headersSent){
        return next(err);
    }

    res.status(err.status || 500).render('pages/error', {
        errMessage: globals.IS_PRODUCTION ?  'Something seems to be broken!' : err.message 
    });
}

module.exports.errorMiddleware = errorMiddleware;