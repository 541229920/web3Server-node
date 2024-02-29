const express = require('express')
const cors = require('cors')

const app = express()

const { port } = require('./config')

const getApi = require('./src/getApi')
const postApi = require('./src/postApi')

app.use(cors())
app.use(express.json())
app.use('/get', getApi)
app.use('/post', postApi)

app.listen(port, () => {
    console.log(`Server mysql port Connected in ${port}......`)
})