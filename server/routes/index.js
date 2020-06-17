const users_route = require('./users');
const sellers_route = require('./sellers');
const posts_route = require('./posts');
const forms_route = require('./forms');
const images_route = require('./images');
const appCount_routes = require('./app-count');
const hg_route = require('./hg');
const vk_route = require('./vk');
const schemas_routes = require('./schemas');
const wiget = require ('./wiget');

const router = (app, passport, jwtOpts) => {
    
    users_route(app, passport, jwtOpts);
    sellers_route(app, passport);
    posts_route(app, passport);
    schemas_routes(app, passport);
    forms_route(app);
    images_route(app);
    appCount_routes(app);
    hg_route(app);
    vk_route(app);
    wiget(app);
}

module.exports = router;