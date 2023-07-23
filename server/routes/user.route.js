const { registerUser, loginUser, getUser, updateUser, deleteUser, followUser, unFollowUser, getAllUsers } = require('../controllers/user.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    //auth
    app.post('/user/register', registerUser)
    app.post('/user/login', loginUser)

    // user CRUD
    app.get('/users', getAllUsers)
    app.get('/user/:id', getUser)
    app.put('/user/:id', updateUser)
    app.delete('/user/:id', deleteUser)
    app.put('/user/:id/follow', followUser)
    app.put('/user/:id/unfollow', unFollowUser)
}
