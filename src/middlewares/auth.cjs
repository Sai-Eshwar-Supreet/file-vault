function isGuest(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }

    next();
}

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect('/login');
}

module.exports.isGuest = isGuest;
module.exports.isAuthenticated = isAuthenticated;