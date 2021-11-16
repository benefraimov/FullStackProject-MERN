const express = require('express')
const cors = require('cors')
const moviesRouter = require('./routers/movies')
const membersRouter = require('./routers/members')
const subscriptionsRouter = require('./routers/subscriptions')


const app = express()

require("./configs/database")

app.use(cors())

app.use(express.json())

app.use('/api/movies', moviesRouter)
app.use('/api/members', membersRouter)
app.use('/api/subscriptions', subscriptionsRouter)

app.listen(8000, () => {
    console.log("App is listenning on port 8000")
})