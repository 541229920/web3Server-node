const $sql = {
    mainTable:'select * from user',
    addUser:'INSERT INTO user(id,address,username,name,password) values(?,?,?,?,?)',
    returnId:'SELECT * FROM user WHERE id = ?'
}

const checkId = (table)=>{
    return `select MAX(id) AS maxId from ${table}`
} 

const loginVaild = (table)=>{

    return  `SELECT id,CASE WHEN EXISTS(
      SELECT 1 FROM ${table}  
      WHERE username = ? AND password = ? 
  ) THEN CAST(1 AS UNSIGNED) ELSE CAST(0 AS UNSIGNED) END AS result
        FROM ${table}
        WHERE username = ? AND password = ?`;
    }
module.exports = {$sql,checkId,loginVaild}