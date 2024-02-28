const express = require('express')
const fs = require('fs')

const {conn} = require('../config.js')
const { $sql } = require('./sqlMap.js')

const router = express.Router()

router.get('/main',(req,res)=>{
    conn.query($sql.mainTable, (err, result) => {
        if (err) throw err;
        res.status(200).json({result})
    })
})


module.exports = router