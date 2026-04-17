const { validationResult, matchedData } = require("express-validator");
const { isGuest } = require("../middlewares/auth.cjs");
const { signupValidator } = require("../validators/formValidators.cjs");
const bcrypt = require('bcrypt');
const globals = require("../models/global.cjs");
const prisma = require("../configs/prisma.cjs");

function renderSignup(res, data = {}){
    res.render('pages/signup', {...data});
}


function validateSignup(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return renderSignup(res, {
            errors: errors.array().map(e => e.msg),
            username: req.body.username,
        });
    }
    
    req.validated = matchedData(req);
    
    next();
}

function getSignup(req, res){
    renderSignup(res);
}

async function postSignup(req, res, next){
    const {username, password} = req.validated;
    const passwordHash = await bcrypt.hash(password, globals.SALT_ROUNDS);
    
    try{
        await prisma.user.create({
            data: {
                username,
                passwordHash
            }
        });
        
        res.redirect('/login');
    }
    catch(err){
        if(err.code === 'P2002'){
            return renderSignup(res, {
                errors: ['Username already exists.'],
                username: req.body.username,
            });
        }
        
        next(err);
    }
}
module.exports.get = [isGuest, getSignup];
module.exports.post = [isGuest, signupValidator, validateSignup, postSignup];