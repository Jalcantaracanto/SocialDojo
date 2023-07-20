const {
    createPost, 
    getPost, 
    updatePost, 
    deletePost,
    likePost,
    getTimelinePosts
} = require('../controllers/post.controller');

module.exports = (app) => {

    // post CRUD
    app.post('/post/', createPost)
    app.get('/post/:id', getPost)
    app.put('/post/:id', updatePost)
    app.delete('/post/:id', deletePost)
    app.put('/post/:id/like', likePost)
    app.get('/post/:id/timeline', getTimelinePosts)

}