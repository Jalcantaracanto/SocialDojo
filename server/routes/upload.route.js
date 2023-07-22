const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
})

const upload = multer({ storage: storage })

module.exports = (app) => {
    app.post('/upload', upload.single('file'), (req, res) => {
        try {
            return res.status(200).json('File uploded successfully')
        } catch (error) {
            console.error(error)
        }
    })
}
