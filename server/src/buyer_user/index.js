const express = require('express')

const { conn } = require('../../config.js')

const router = express.Router()


const AddBuyerMaxId = () => {
    const abmi = 'SELECT MAX(id) from buyer_user'
    return new Promise((resolve, reject) => {
        conn.query(abmi, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

router.get('/buyerinfo', (req, res) => {
    const getBuyerInfo = 'SELECT * FROM buyer_user'
    conn.query(getBuyerInfo, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error info :', err })
        } else {
            return res.status(200).json({ result })
        }
    })
})


router.post('/addbuyer', async (req, res) => {

    const data = req.body
    const DataWechat = data.wechat
    const DataPhoto = data.photo
    const DataPrice = data.price
    const DataQuota = data.quota
    const DataProject = data.project
    const DataHash = data.hash

    try {
        const getMaxId = await AddBuyerMaxId()
        const dataId = getMaxId[0]['MAX(id)'] + 1
        const params = [dataId, DataWechat, DataPhoto, DataPrice, DataQuota, DataProject, DataHash]
        const addBuyerUserInfo = 'INSERT INTO buyer_user(id,wechat,photo,price,quota,project,hash) values(?,?,?,?,?,?,?)'
        conn.query(addBuyerUserInfo, params, async (err, result) => {
            if (err) {
                res.status(400).json({ message: 'Add buyer user Error', err })
            } else {
                console.log(result)
                res.status(200).json({ result })
            }
        })
    } catch (err) {
        res.status(500).json({ message: 'Error info', err })
    }
})


module.exports = router