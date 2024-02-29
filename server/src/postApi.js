const express = require('express')
const fs = require('fs')

const { conn } = require('../config.js')
const { $sql, checkId, loginVaild } = require('./sqlMap.js')
const { error } = require('console')

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
    const params = [user, password, user, password]

    conn.query(loginVaild('user'), params, (err, result) => {
        if (err) throw err;
        const isValid = result[0].result
        const id = result[0].id
        if (isValid) {
            
            conn.query($sql.returnId, id, (err, res2) => {
                if (err) throw err;
                
                console.log(res2)
                res.status(200).json({
                    Validstatus: true,
                    userdata: res2
                })
            })
        } else {
            res.status(400).json({
                message: "查无用户！请重新注册！"
            })
        }
    })
})

module.exports = router