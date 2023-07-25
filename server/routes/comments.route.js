const { addComment, getComments } = require('../controllers/comments.controller')

module.exports = (app) => {
    app.post('/comment/', addComment)
    app.get('/comments/:postId', getComments)
}
