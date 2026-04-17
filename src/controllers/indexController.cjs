const { isAuthenticated } = require("../middlewares/auth.cjs");

function getHome(req, res){
    res.render('pages/home');
}

module.exports.getHome = [isAuthenticated, getHome];