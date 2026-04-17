const { matchedData, validationResult } = require("express-validator");
const { isGuest } = require("../middlewares/auth.cjs");
const passport = require("passport");
const { loginValidator } = require("../validators/formValidators.cjs");


function renderLogin(res, data = {}){
    res.render('pages/login', {...data});
}

function getLogin(req,res){
    renderLogin(res);
}

function validateLogin(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return renderLogin(res, {
            errors: errors.array().map(e => e.msg),
            username: req.body.username,
        });
    }

    req.validated = matchedData(req);    
    next();
}

function postLogin(req, res, next){
    passport.authenticate('local', (err, user) => {
        if(err){
            return next(err);
        }

        if(!user){
            return renderLogin(res, {
                errors: ['Invalid username or password'],
                username: req.body.username,
            });
        }

        req.login(user, err => {
            if(err) return next(err);

            res.redirect('/');
        });

    })(req, res, next);
}

module.exports.get = [isGuest, getLogin];
module.exports.post = [isGuest, loginValidator, validateLogin, postLogin];