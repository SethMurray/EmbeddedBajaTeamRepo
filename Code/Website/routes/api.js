let express = require('express');
let router = express.Router();
let pg = require('pg');

let constants = require('../constants');
let db = require('../db.js');

router.get('/temperatures', (req, res) => {
    db.query('SELECT * FROM temperature', (err, result) => {
        if (err) {
            res.json(err);
        }
        if (result) {
            res.json(result.rows);
        }
    });
});

router.get('/lastTemp', (req, res) => {
    db.query('SELECT * FROM temperature ORDER BY timestamp DESC LIMIT 1', (err, result) => {
        if (err) {
            return res.json(err);
        }
        if (result) {
            res.json(result.rows);
        }
    });
});

module.exports = router;