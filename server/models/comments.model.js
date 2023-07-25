const { Schema, model } = require('mongoose')

const CommentsSchema = new Schema(
    {
        chatId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const Comments = model('Comments', CommentsSchema)
module.exports = Comments
