const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'username',
    host: 'host',
    database: 'database',
    password: 'password',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
