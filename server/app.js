const express = require('express')
const cors = require('cors')

const router = express.Router()
const app = express()

const { port,conn } = require('./config')
const { $sql } = require('./src/sqlMap.js')


const getApi = require('./src/getApi')
const postApi = require('./src/postApi')

app.use(cors())
app.use(express.json())
app.use('/get', getApi)
app.use('/post', postApi)



// app.get('/main',(req,res)=>{
//     conn.query($sql.mainTable, (err, result) => {
//         if (err) throw err;
//         // console.log(result)
//         res.json(result)
//     })
// })



app.listen(port, () => {
    console.log(`Server mysql port Connected in ${port}......`)
})