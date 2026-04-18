const prisma = require("../configs/prisma.cjs");
const { isAuthenticated } = require("../middlewares/auth.cjs");

async function getHome(req, res, next){
    try{
        const folders = await prisma.folder.findMany(
            {where: {userId: req.user.id}}
        )
        res.render('pages/home', {folders});
    }catch(err){
        next(err);
    }
}

module.exports.getHome = [isAuthenticated, getHome];