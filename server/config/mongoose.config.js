const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1/socialNetworkdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Conection established to database'))
    .catch((err) => console.log("We couldn't connect to database ", err))
