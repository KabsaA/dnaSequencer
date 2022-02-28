const {Pool} = require("pg").Pool;

const pool = new Pool({
    user : 'cscigroup7',
    password: 'password',
    database : 'dnsarlogin',
    host: 'localhost',
    port: 5432

});

module.exports = pool;
