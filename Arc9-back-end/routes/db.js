const pgp = require('pg-promise')();
const config={
    'database': 'arc9-app',
    'host':'localhost'
};

const db = pgp(config);

module.exports = db