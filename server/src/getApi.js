const express = require('express')
const fs = require('fs')

const { conn } = require('../config.js')
const { $sql } = require('./sqlMap.js')

const router = express.Router()




module.exports = router