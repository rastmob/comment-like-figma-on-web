const commentRouter = require('./comment.route');
const routeManager = (app) => {
    app.use('/comment', commentRouter);
}

module.exports = routeManager;