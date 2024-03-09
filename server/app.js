const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

const { port } = require('./config')

const getApi = require('./src/getApi')
const postApi = require('./src/postApi')
const buyer = require('./src/buyer_user/index')

app.use(cors())
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
app.use('/get', getApi)
app.use('/post', postApi)
app.use('/buyer',buyer)

app.listen(port, () => {
    console.log(`Server mysql port Connected in ${port}......`)
})