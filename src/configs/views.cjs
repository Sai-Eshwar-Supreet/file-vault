const layout = require('express-ejs-layouts');

function configureViews(app, viewRoot){
    app.set('views', viewRoot);
    app.set('view engine', 'ejs');
    app.use(layout);
    app.set('layout extractScripts', true);
}

module.exports = configureViews;