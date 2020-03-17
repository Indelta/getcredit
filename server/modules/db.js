const mysql = require('mysql');

const dbCon = mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'getcredit'
});

dbCon.connect();

module.exports = dbCon;