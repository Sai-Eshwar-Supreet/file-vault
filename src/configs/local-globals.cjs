const globals = require("../models/global.cjs");

function configureLocalGlobals(app){
    app.use((req, res, next) => {
        res.locals.user = req.user;
        res.locals.title = globals.TITLE;

        next();
    });
}

module.exports = configureLocalGlobals;