const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://benUserpass12:ben1234@cluster0.sgo3f.mongodb.net/subscriptionsDB?retryWrites=true&w=majority",
    { useNewUrlParser: true })

mongoose.connection
    .once('open', () => console.log('Connected'))
    .on('error', (err) => {
        console.log("Your Error", err);
    })

