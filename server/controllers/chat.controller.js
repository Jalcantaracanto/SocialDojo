const Chat = require('../models/chat.model')

module.exports.createChat = (req, res) => {
    console.log(req.body)
    Chat.create({ members: [req.body.senderId, req.body.receiverId] })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json(error)
        })
}

module.exports.userChats = (req, res) => {
    Chat.find({ members: { $in: [req.params.userId] } })
        .then((chats) => {
            res.status(200).json(chats)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
}

module.exports.findChat = (req, res) => {
    Chat.findOne({
        members: { $all: [req.params.firstID, req.params.secondID] },
    })
        .then((chat) => {
            res.status(200).json(chat)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
}

module.exports.deleteChat = (req, res) => {
    Chat.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
}
