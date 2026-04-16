const layout = require('express-ejs-layouts');

function configureViews(app, viewRoot){
    app.set('views', viewRoot);
    app.set('view engine', 'ejs');
    app.set(layout);
}

module.exports = configureViews;