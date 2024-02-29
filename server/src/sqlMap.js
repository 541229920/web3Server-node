const $sql = {
    mainTable:'select * from user',
    addUser:'INSERT INTO user(id,address,user,name,password) values(?,?,?,?,?)'
}

const checkId = (table)=>{
    return `select MAX(id) AS maxId from ${table}`
} 

const loginVaild = (username,password)=>{
    return `select MAX(id) AS maxId from ${table}`
}

module.exports = {$sql,checkId}