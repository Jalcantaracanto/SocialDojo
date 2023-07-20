const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Register a new User
module.exports.registerUser = (req, res) => {
    const { username, password, firstname, lastname, email, confirmPassword } = req.body
    User.create({ username, password, firstname, lastname, email, confirmPassword })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err))
}

//Login User
module.exports.loginUser = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }).then((user) => {
        if (user === null) {
            return res.status(400).json({ msg: 'You are not registered' })
        } else {
            bcrypt
                .compare(password, user.password)
                .then((isValid) => {
                    if (isValid) {
                        const userToken = jwt.sign(
                            {
                                id: user._id,
                                email: user.email,
                                nickname: user.nickname,
                            },
                            process.env.SECRET_KEY
                        )
                        res.cookie('usertoken', userToken, process.env.SECRET_KEY, {
                            httpOnly: true,
                        }).json({ msg: 'Conexión Exitosa!' })
                    } else {
                        res.status(403).json({ msg: 'Correo o contraseña incorrectos 2' })
                    }
                })
                .catch((err) => res.status(400).json({ msg: 'Correo o contraseña incorrectos', error: err }))
        }
    })
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
    const { currentUserId, currentUserAdminStatus, password } = req.body

    if (id == currentUserId || currentUserAdminStatus) {
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
                            res.status(200).json(user)
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
    const { currentUserId } = req.body

    if (currentUserId === id) {
        res.status(403).json({ message: 'You cannot follow yourself.' })
    } else {
        try {
            const followUser = await User.findById(id)
            const currentUser = await User.findById(currentUserId)

            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } })
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
    const { currentUserId } = req.body

    if (currentUserId === id) {
        res.status(403).json({ message: 'You cannot follow yourself.' })
    } else {
        try {
            const followUser = await User.findById(id)
            const currentUser = await User.findById(currentUserId)

            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } })
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
