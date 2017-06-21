const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/player', (req, res) => {
    pool.query("select PID,PNAME,TNAME,PLIKE from player, team where team.TID=player.TID", function (err, rows, fields) {
        if (err) throw err;
        ans = [];
        rows.forEach(function (element) {
            ans.push({
                id: element.PID,
                name: element.PNAME,
                team: element.TNAME,
                like: element.PLIKE
            });
        }, this);
        res.send(ans);
    });
});

router.get('/competition', (req, res) => {
    pool.query("select * from competition", function (err, rows, fields) {
        if (err) throw err;
        ans = [];
        rows.forEach(function (element) {
            ans.push({
                id: element.CID,
                date: element.CDATA.toLocaleDateString('chinese'),
                name: element.CNAME,
                loc: element.CLOC
            });
        }, this);
        res.send(ans);
    });
});

router.get('/team', (req, res) => {
    console.log(req.query);
    let querystr = "select * from team t";
    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            querystr = querystr + " and " + key + "='" + req.query[key] + "'";
        }
    }
    pool.query(querystr, function (err, rows, fields) {
        if (err) throw err;
        ans = [];
        rows.forEach(function (element) {
            ans.push({
                id: element.TID,
                name: element.TNAME,
                loc: element.TLOC,
                university: element.TSCHOOL,
                teacher: element.TTEACHER,
                person: element.TPERSON
            });
        }, this);
        res.send(ans);
    })
});

router.get('/score', (req, res) => {
    console.log(req.query);
    let querystr = "select CDATA, CNAME, TNAME, SCORE from competition c, team t, score s where c.CID=s.CID and t.TID=s.TID";
    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            querystr = querystr + " and " + key + "='" + req.query[key] + "'";
        }
    }
    pool.query(querystr, function (err, rows, fields) {
        if (err) throw err;
        ans = [];
        rows.forEach(function (element) {
            ans.push({
                date: element.CDATA.toLocaleDateString('chinese'),
                name: element.CNAME,
                team: element.TNAME,
                score: element.SCORE
            });
        }, this);
        res.send(ans);
    })
})

router.post('/newscore', (req, res) => {
    let tid = 0,
        cid = 0;
    pool.query("select TID from team where TNAME=?", [req.body.team] , function (err, rows, fields) {
        if (err) throw err;
        if (rows.length) {
            tid = rows[0].TID;
            pool.query("select CID from competition where CNAME=?", [req.body.com] + "'", function (err, rows, fields) {
                if (err) throw err;
                if (rows.length) {
                    cid = rows[0].CID;
                    pool.query("insert into score (CID, TID, SCORE) values (?,?,?)", [cid, tid, req.body.score], function (err, rows, fields) {
                        console.log(err);
                        if (err) {
                            res.json({
                                status: 1,
                                msg: err.errno === 1062 ? "已经存在重复记录！" : "未知错误！"
                            });
                        } else {
                            res.json({
                                status: 0
                            })
                        }
                    })
                } else {
                    res.json({
                        status: 1,
                        msg: "没有这个比赛！"
                    });
                    return;
                }
            });
        } else {
            res.json({
                status: 1,
                msg: "没有这个队伍！"
            });
            return;
        }
    });


})

router.post('/editscore', (req, res) => {
    let tid = 0,
        cid = 0;
    console.log(req.body);
    pool.query("select TID from team where TNAME=?", [req.body.team], function (err, rows, fields) {
        if (err) throw err;
        if (rows.length) {
            tid = rows[0].TID;
            pool.query("select CID from competition where CNAME=?", [req.body.com], function (err, rows, fields) {
                if (err) throw err;
                if (rows.length) {
                    cid = rows[0].CID;
                    pool.query("update score set SCORE=? where TID=? and CID=?", [req.body.score, tid, cid], function (err, rows, fields) {
                        console.log(err);
                        if (err) {
                            res.json({
                                status: 1,
                                msg: err.errno === 1062 ? "已经存在重复记录！" : "未知错误！"
                            });
                        } else {
                            res.json({
                                status: 0
                            })
                        }
                    })
                } else {
                    res.json({
                        status: 1,
                        msg: "没有这个比赛！"
                    });
                    return;
                }
            });
        } else {
            res.json({
                status: 1,
                msg: "没有这个队伍！"
            });
            return;
        }
    });


})

router.post('/deletescore', (req, res) => {
    let tid = 0,
        cid = 0;
    console.log(req.body);
    pool.query("select TID from team where TNAME=?", [req.body.team], function (err, rows, fields) {
        if (err) throw err;
        if (rows.length) {
            tid = rows[0].TID;
            pool.query("select CID from competition where CNAME=?", [req.body.com], function (err, rows, fields) {
                if (err) throw err;
                if (rows.length) {
                    cid = rows[0].CID;
                    pool.query("delete from score where TID=? and CID=?", [tid, cid], function (err, rows, fields) {
                        console.log(err);
                        if (err) {
                            res.json({
                                status: 1,
                                msg: "删除失败！"
                            });
                        } else {
                            res.json({
                                status: 0
                            })
                        }
                    })
                } else {
                    res.json({
                        status: 1,
                        msg: "没有这个比赛！"
                    });
                    return;
                }
            });
        } else {
            res.json({
                status: 1,
                msg: "没有这个队伍！"
            });
            return;
        }
    });


})
module.exports = router;