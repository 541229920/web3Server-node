const express = require('express')
const fs = require('fs')

const { conn } = require('../config.js')
const { $sql, checkId } = require('./sqlMap.js')

const router = express.Router()

router.post('/regis', (req, res) => {
    const data = req.body

    conn.query(checkId('user'), (err, succ) => {
        if (err) throw err;

        if (!data.name) {
            data.name = data.address
        }
        const id = succ[0]['maxId'] + 1
        const ArrData = [id, data.address, data.user, data.name, data.password]
        conn.query($sql.addUser, ArrData, (err, result) => {
            if (err) throw err;
            res.status(200).json({ result })
        })
    })
})





router.post('/login', (req, res) => {
    const { user, password } = req.body

    conn.query($sql.mainTable, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.status(200).json({ result })
    })
})

module.exports = router