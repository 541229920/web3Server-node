const mysql = require('mysql')

module.exports = {
    port: 8080,
    conn: mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '3364',
        database: 'website'
    })
}