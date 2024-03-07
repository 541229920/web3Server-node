const express = require('express')
const fs = require('fs')
const fetch = require('node-fetch');

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
            if (err) {
                return reject(err)
            }
            if (!result || result.length === 0) {
                return resolve({ isValid: 0 })
            } else {
                const data = {
                    isValid: result[0].result,
                    id: result[0].id
                }
                return resolve(data);
            }
        });
    });
};

// 注册用户
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
                return res.status(500).json({ error: 'Internal server error' });
            }

            const maxId = result[0].max_id || 0; // 如果表为空,则设置为 0
            const newId = maxId + 1;

            const insertUserQuery = 'INSERT INTO user (id, username, password, address, name) VALUES (?, ?, ?, ?, ?)';
            const insertParams = [newId, sanitizedUsername, sanitizedPassword, sanitizedMetamaskAddress, sanitizedName || sanitizedMetamaskAddress];

            conn.query(insertUserQuery, insertParams, (err, succsc) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const newUserId = succsc.insertId;

                res.status(200).json({
                    message: '注册成功',
                    userId: newUserId,
                    isValid: true
                });
            });
        })

    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})

//登录用户
router.post('/login', async (req, res) => {
    const { username, password, metamaskAddress, name } = req.body;

    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedMetamaskAddress = sanitizeInput(metamaskAddress);
    const sanitizedName = sanitizeInput(name);

    try {
        //查询是否有用户
        const userExists = await checkUserExists(sanitizedUsername);
        if (userExists.isValid) {
            //确定有用户
            const CheckID = 'SELECT * FROM user WHERE id = ?'
            conn.query(CheckID, userExists.id, (err, result) => {
                if (err) throw err;
                //需要后台服务器验证账号密码是否匹配
                if (sanitizedPassword == result[0].password) {

                    const userdata = {
                        username: result[0].username,
                        address: result[0].address,
                        name: result[0].name,
                        userId: result[0].id
                    }
                    return res.status(200).json({
                        Validstatus: true,
                        userdata: userdata
                    })
                } else {
                    return res.status(401).json({
                        Validstatus: false,
                        message: "密码不正确，请重新输入密码！"
                    })
                }
            })
        } else {
            return res.status(404).json({ message: "该用户名未注册或账号密码错误，请重试！", err })
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})


router.post('/trx', async (req, res) => {

    const apiKey = 'd088f9ab-17b3-488a-8f99-7b93478720f7';
    const address = 'TCdTfftGiZYurxbcyHouCYCNjra1xwTpuU'
    const endpoint = 'https://apilist.tronscanapi.com/api/transaction?address=' + address;

    try {
        await fetch(endpoint, {
            headers: {
                'TRON-PRO-API-KEY': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                return res.status(200).json({ data })
            })
            .catch(error => console.error(error));
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})



module.exports = router