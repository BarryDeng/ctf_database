const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/player', (req, res) => {
    pool.query("select * from player", function(err, rows, fields){
        if (err) throw err;
        res.send(rows);
    });
});

router.get('/competition', (req, res) => {
    pool.query("select * from competition", function(err, rows, fields){
        if (err) throw err;
        ans = [];
        rows.forEach(function(element) {
            ans.push({date: element.CDATA, name: element.CNAME, address: element.CLOC});
        }, this);
        res.send(ans);
    });
});

router.get('/team', (req, res) => {
    pool.query("select * from team", function(err, rows, fields){
        if (err) throw err;
        res.send(rows);
    })
});

router.get('/score', (req, res) => {
    pool.query("select * from score", function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    })
})
module.exports = router;