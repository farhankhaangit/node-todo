const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const routes = require('./routes/todo-routes')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("Database Connected."))
.catch((er) => console.log("database connect error: ",er))

app.use(routes)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))