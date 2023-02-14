

const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Job_application",
});

conn.connect((err) => {
    {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Database connected`);
        }
    }

})

module.exports = conn;