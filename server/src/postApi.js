const express = require('express')
const fs = require('fs')

const { conn } = require('../config.js')
const { $sql, checkId, loginVaild } = require('./sqlMap.js')

const router = express.Router()

const sanitizeInput = (input) => {
    // 对输入进行净化和验证
    return input;
}

//验证是否有用户信息
const checkUserExists = (username) => {
    return new Promise((resolve, reject) => {
        const checkUserQuery = 'SELECT id,CASE WHEN EXISTS( SELECT 1 FROM user  WHERE username = ? ) THEN CAST(1 AS UNSIGNED) ELSE CAST(0 AS UNSIGNED) END AS result FROM user WHERE username = ? ';

        conn.query(checkUserQuery, [sanitizeInput(username), sanitizeInput(username)], (err, result) => {
            
            if (err) throw err;
 
            if (result[0].result) {
                const isValid = result[0].result
                const id = result[0].id
                const data = {
                    isValid, id
                }
                resolve(data);
            } else {
                console.log('没信息')
                reject(err);
            }
        });
    });
};

router.post('/regis', async (req, res) => {
    const { username, password, metamaskAddress, name } = req.body;

    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedMetamaskAddress = sanitizeInput(metamaskAddress);
    const sanitizedName = sanitizeInput(name);

    try {
        const userExists = await checkUserExists(sanitizedUsername);

        if (userExists.isValid) {
            return res.status(200).json({
                message: '用户名已注册!',
                isValid: false
            });
        }
        const getMaxIdQuery = 'SELECT MAX(id) AS max_id FROM user';
        conn.query(getMaxIdQuery, (err, result) => {
            if (err) {
                console.error('Error getting max id:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const maxId = result[0].max_id || 0; // 如果表为空,则设置为 0
            const newId = maxId + 1;

            const insertUserQuery = 'INSERT INTO user (id, username, password, address, name) VALUES (?, ?, ?, ?, ?)';
            const insertParams = [newId, sanitizedUsername, sanitizedPassword, sanitizedMetamaskAddress, sanitizedName || sanitizedMetamaskAddress];

            conn.query(insertUserQuery, insertParams, (err, succsc) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const newUserId = succsc.insertId;

                res.status(200).json({
                    message: '注册成功',
                    userId: newUserId
                });
            });
        })

    } catch (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})


router.post('/login', async (req, res) => {
    const { username, password, metamaskAddress, name } = req.body;

    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedMetamaskAddress = sanitizeInput(metamaskAddress);
    const sanitizedName = sanitizeInput(name);

    try {
        const userExists = await checkUserExists(sanitizedUsername);

        if (userExists.isValid) {
            const CheckID = 'SELECT * FROM user WHERE id = ?'
            conn.query(CheckID, userExists.id, (err, result) => {
                if (err) throw err;
                res.status(200).json({
                    Validstatus: true,
                    userdata: result
                })
            })
        }

    } catch (err) {
        res.status(500).json({ message: "查无用户！请重新注册！", err })
    }
})

module.exports = router