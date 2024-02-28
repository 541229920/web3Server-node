const $sql = {
    mainTable:'select * from main'
    
}

const checkId = (table)=>{
    return `select MAX(id) AS maxId from ${table}`
} 

module.exports = {$sql,checkId}