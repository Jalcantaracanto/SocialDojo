const Post = require('../models/post.model')
const User = require('../models/user.model')
const mongoose = require('mongoose')

//Create new post
module.exports.createPost = (req, res) => {
    Post.create(req.body)
        .then((post) => res.json({ message: 'Post Created', post: post }))
        .catch((err) => res.status(400).json(err))
}

//Get a post
module.exports.getPost = (req, res) => {
    const id = req.params.id
    Post.findOne({ _id: id })
        .then((post) => res.json(post))
        .catch((err) => res.status(500).json({ message: 'Error to get post', error: err }))
}

//Update a post
module.exports.updatePost = (req, res) => {
    const id = req.params.id
    const { userId } = req.body

    Post.findOne({ _id: id })
        .then((post) => {
            if (post.userId === userId) {
                post.updateOne({ $set: req.body })
                    .then(() => {
                        res.status(200).json('the post has been updated')
                    })
                    .catch((error) => {
                        res.status(500).json(error)
                    })
            } else {
                res.status(403).json('you can update only your post')
            }
        })
        .catch((error) => {
            res.status(500).json(error)
        })
}

//Delete a post
module.exports.deletePost = (req, res) => {
    const id = req.params.id
    const { userId } = req.body
    Post.findOne({ _id: id })
        .then((post) => {
            if (post.userId === userId) {
                post.deleteOne()
                    .then(() => {
                        res.status(200).json('the post has been deleted')
                    })
                    .catch((error) => {
                        res.status(500).json(error)
                    })
            } else {
                res.status(403).json('you can delete only your post')
            }
        })
        .catch((error) => {
            res.status(500).json(error)
        })
}

// Like/dislike a post
module.exports.likePost = (req, res) => {
    const id = req.params.id
    const { userId } = req.body

    Post.findById(id)
        .then((post) => {
            if (!post.likes.includes(userId)) {
                post.updateOne({ $push: { likes: userId } })
                    .then(() => {
                        res.status(200).json({ message: 'The post has been liked' })
                    })
                    .catch((error) => {
                        res.status(500).json(error)
                    })
            } else {
                post.updateOne({ $pull: { likes: userId } })
                    .then(() => {
                        res.status(200).json({ message: 'The post has been unliked' })
                    })
                    .catch((error) => {
                        res.status(500).json(error)
                    })
            }
        })
        .catch((error) => {
            res.status(500).json(error)
        })
}

// Get timeline posts
module.exports.getTimelinePosts = async (req, res) => {
    const userId = req.params.id

    try {
        const currentUserPosts = await Post.find({ userId: userId })
        const followingPosts = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'following',
                    foreignField: 'userId',
                    as: 'followingPosts',
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ])

        res.status(200).json(
            currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
                return b.createdAt - a.createdAt
            })
        )
    } catch (error) {
        res.status(500).json(error)
    }
}
