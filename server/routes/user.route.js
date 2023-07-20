const { 
    registerUser, 
    loginUser, 
    getUser, 
    updateUser, 
    deleteUser, 
    followUser, 
    unFollowUser
} = require('../controllers/user.controller')

module.exports = (app) => {

    //auth
    app.post('/user/register', registerUser)
    app.post('/user/login', loginUser)

    // user CRUD
    app.get('/user/:id', getUser)
    app.put('/user/:id', updateUser)
    app.delete('/user/:id', deleteUser)
    app.put('/user/:id/follow', followUser)
    app.put('/user/:id/unfollow', unFollowUser)
}
