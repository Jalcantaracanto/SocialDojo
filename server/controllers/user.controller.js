const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.registerUser = (req, res) => {
    const { email, password } = req.body

    bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPass) => {
            //transformamos la clave en un hash
            req.body.password = hashedPass
            return User.findOne({ email })
        })
        .then((oldUser) => {
            //verificamos si el usuario ya existe
            if (oldUser) {
                //si existe, retornamos un error
                return res.status(400).json({ message: 'User already exists' })
            }
            const newUser = new User(req.body) //si no existe, creamos el usuario
            // return newUser.create() //guardamos el usuario
            return newUser.save()
        })
        .then((user) => {
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' }) //creamos el token
            res.status(200).json({ user, token }) //enviamos el usuario y el token
        })
        .catch((error) => {
            res.status(500).json({ message: error.message })
        })
}

//Login User
module.exports.loginUser = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.status(404).json('User not found')
            }

            return bcrypt.compare(password, user.password).then((validity) => {
                if (!validity) {
                    return res.status(400).json('wrong password')
                }
                const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
                res.status(200).json({ user, token })
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

//Get all Users
module.exports.getAllUsers = (req, res) => {
    User.find()
        .select({ password: 0 }) //exclude password
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({ message: 'Error to get users', error: err }))
}

//Get a User
module.exports.getUser = (req, res) => {
    const id = req.params.id
    User.findOne({ _id: id })
        .select({ password: 0 }) //exclude password
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json({ message: 'Error to get user', error: err }))
}

//Update a User
module.exports.updateUser = (req, res) => {
    const id = req.params.id
    const { _id, currentUserAdminStatus, password } = req.body

    if (id == _id) {
        const updateUserPromise = new Promise((resolve, reject) => {
            if (password) {
                bcrypt
                    .genSalt(10)
                    .then((salt) => bcrypt.hash(password, salt))
                    .then((hash) => {
                        req.body.password = hash
                        resolve()
                    })
                    .catch((err) => reject(err))
            } else {
                resolve()
            }
        })
        updateUserPromise
            .then(() => {
                User.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true })
                    .then((user) => {
                        if (!user) {
                            res.status(404).json({ message: 'User not found.' })
                        } else {
                            const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
                            res.status(200).json({ user, token })
                        }
                    })
                    .catch((err) => res.status(500).json({ message: 'Error to update user', error: err }))
            })
            .catch((err) => res.status(500).json({ message: 'Error to update user', error: err }))
    } else {
        res.status(403).json({ message: 'You are not allowed to update this user.' })
    }
}

//Delete a User
module.exports.deleteUser = (req, res) => {
    const id = req.params.id
    const { currentUserId, currentUserAdminStatus } = req.body

    if (id === currentUserId || currentUserAdminStatus) {
        User.deleteOne({ _id: id })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found.' })
                } else {
                    res.status(200).json(user)
                }
            })
            .catch((err) => res.status(500).json({ message: 'Error to delete user', error: err }))
    } else {
        res.status(403).json({ message: 'You are not allowed to delete this user.' })
    }
}

//Follow a User
module.exports.followUser = async (req, res) => {
    const id = req.params.id
    const { _id } = req.body

    if (_id === id) {
        res.status(403).json({ message: 'You cannot follow yourself.' })
    } else {
        try {
            const followUser = await User.findById(id)
            const currentUser = await User.findById(_id)

            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } })
                await currentUser.updateOne({ $push: { followings: id } })
                res.status(200).json({ message: 'User has been followed' })
            } else {
                res.status(403).json({ message: 'You already follow this user' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error to follow user', error: error })
        }
    }
}

//unFollow a User
module.exports.unFollowUser = async (req, res) => {
    const id = req.params.id
    const { _id } = req.body

    if (_id === id) {
        res.status(403).json({ message: 'You cannot follow yourself.' })
    } else {
        try {
            const followUser = await User.findById(id)
            const currentUser = await User.findById(_id)

            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: { followers: _id } })
                await currentUser.updateOne({ $pull: { followings: id } })
                res.status(200).json({ message: 'User Unfollowed' })
            } else {
                res.status(403).json({ message: 'User is not followed by you' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error to unfollow user', error: error })
        }
    }
}
