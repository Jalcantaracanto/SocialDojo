const { Schema, model } = require('mongoose')

const PostSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        description: String,
        likes: [],
        image: String,
    },
    { timestamps: true }
)

const Post = model('Post', PostSchema)
module.exports = Post
