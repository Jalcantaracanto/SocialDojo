const Comments = require('../models/comments.model')

module.exports.addComment = (req, res) => {
    const { postId, senderId, text } = req.body
    Comments.create({ postId, senderId, text })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json(error)
        })
}

module.exports.getComments = (req, res) => {
    const { postId } = req.params
    Comments.find({ postId })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json(error)
        })
}
