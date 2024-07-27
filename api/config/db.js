const mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_COLLECTION,
    port: process.env.DB_PORT,
})

connection.connect((err) => {
    if (err) {
        console.error(err)
        return;
    }
    console.log("Database Connect!!!");
})

module.exports = connection