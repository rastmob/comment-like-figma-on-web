const commentRouter = require('./comment.route');
const indexRouter = require('./index.route');
const routeManager = (app) => {
    app.use('/', indexRouter);
    app.use('/comment', commentRouter);
}

module.exports = routeManager;