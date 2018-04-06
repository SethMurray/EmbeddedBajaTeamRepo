let express = require('express');
let router = express.Router();
let pg = require('pg');

let constants = require('../constants');

router.get('/temperatures', (req, res) => {
    let client = new pg.Client({
        host: constants.DBHost,
        user: constants.DBUser,
        password: constants.DBPassword,
        database: constants.DBName,
        port: 5432,
        ssl: false
    });
    client.connect((err) => {
        if (err) {
            res.json(err);
        }
        client.query('SELECT * FROM temperature', (err, result) => {
            if (err) {
                res.json(err);
            }
            res.json(result.rows);
        });
    });
});

router.get('/lastTemp', (req, res) => {
    let client = new pg.Client({
        host: constants.DBHost,
        user: constants.DBUser,
        password: constants.DBPassword,
        database: constants.DBName,
        port: 5432,
        ssl: false
    });
    client.connect((err) => {
        if (err) {
            res.json(err);
        }
        client.query('SELECT * FROM temperature ORDER BY timestamp DESC LIMIT 1', (err, result) => {
            if (err) {
                res.json(err);
            }
            res.json(result.rows);
        });
    });
});

module.exports = router;