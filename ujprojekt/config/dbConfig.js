const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'vdqixrmcwgznhx',
    host: 'ec2-54-154-101-45.eu-west-1.compute.amazonaws.com',
    database: 'd196ds0889nd00',
    password: '3f40ffd51b604f52a61b800e9e77105db70c5e3a2bc3903b367815253d654aba',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;