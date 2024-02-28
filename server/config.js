const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3364',
    database: 'website'
})

module.exports = {
    port: 8080,
    conn
}