const express = require('express')
const cors = require('cors')

// Routers
const usersRouter = require('./routers/users')
const membersRouter = require('./routers/members')
const moviesRouter = require('./routers/movies')
const subscriptionsRouter = require('./routers/subscriptions')

const app = express()

require('./config/database')

app.use(cors())

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/members', membersRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/subscriptions', subscriptionsRouter)

app.listen(8001, () => {
    console.log("App is listenning port 8001")
})