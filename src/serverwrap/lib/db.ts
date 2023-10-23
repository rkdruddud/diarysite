
const mysql = require('mysql');

const db = mysql.createPool({
    host:'127.0.0.2',
    user: 'root',
    password: '0000',
    database:'diaryuserinfo',
    port: 3306,
    multipleStatements: true // 다중쿼리 사용 설정
});


//module.exports = db;
export default db;