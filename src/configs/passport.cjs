const passport = require("passport");
const prisma = require("./prisma.cjs");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function configurePassport(app){
    const strategy = new LocalStrategy({passReqToCallback: true} ,async (req, username, password, done) => {
        try{
            if(!req.validated) throw new Error('Validation middleware missing');

            const {username: safeUsername, password: safePassword} = req.validated;
            const user = await prisma.user.findUnique({
                where:{username: safeUsername}
            });
    
            if(!user) return done(null, false);
    
            const match = await bcrypt.compare(safePassword, user.passwordHash);
    
            if(!match) return done(null, false);
    
            return done(null, user);
        }
        catch(err){
            done(err);
        }
    });
    passport.use(strategy);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try{
            const user = await prisma.user.findUnique({
                where: { id }
            });
            
            done(null, user);
        }
        catch(err){
            done(err);
        }
    });


    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = configurePassport;