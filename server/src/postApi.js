const express = require('express')
const fs = require('fs')

const {conn} = require('../config.js')
const { $sql, checkId } = require('./sqlMap.js')

const router = express.Router()


console.log('这是post文件')


module.exports = router