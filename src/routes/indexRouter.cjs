const { Router } = require('express');
const { getHome } = require('../controllers/indexController.cjs');

const indexRouter = new Router();

indexRouter.get('/', getHome);

module.exports = indexRouter;