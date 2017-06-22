const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/player', (req, res) => {
    let querystr = "select PID,PNAME,TNAME,PLIKE from player,team where team.TID=player.TID";
    let typeEnable = 0;
    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            if (key === "type") {
                typeEnable = 1;
            } else {
                querystr = querystr + " and team." + key + " like '%" + req.query[key] + "%'";
            }

        }
    }
    if (typeEnable) querystr = querystr + " order by PID limit 0,10";
    pool.query(querystr, function (err, rows, fields) {
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

router.post('/newplayer', (req, res) => {
    let tid = 0;
    pool.query("select TID from team where TNAME=?", [req.body.team], function (err, rows, fields) {
        if (err) {
            res.json({
                status: 1,
                msg: "未知错误！"
            })
        } else {
            if (rows.length) {
                tid = rows[0].TID;
                pool.query("insert into player (PNAME, TID, PLIKE) values (?,?,?)", [req.body.name, tid, req.body.like], function (err, rows, fields) {
                    console.log(err);
                    if (err) {
                        res.json({
                            status: 1,
                            msg: "未知错误！"
                        });
                    } else {
                        res.json({
                            status: 0
                        });
                    }
                })
            } else {
                res.json({
                    status: 1,
                    msg: "没有这个队伍！"
                })
            }
        }
    })

})

router.post('/editplayer', (req, res) => {
    let tid = 0;
    pool.query("select TID from team where TNAME=?", [req.body.team], function (err, rows, fields) {
        if (err) {
            res.json({
                status: 1,
                msg: "未知错误！"
            })
        } else {
            if (rows.length) {
                tid = rows[0].TID;
                pool.query("update player set PNAME=?, TID=?, PLIKE=? where PID=?", [req.body.name, tid, req.body.like, req.body.id], function (err, rows, fields) {
                    console.log(err);
                    if (err) {
                        res.json({
                            status: 1,
                            msg: "未知错误！"
                        });
                    } else {
                        res.json({
                            status: 0
                        });
                    }
                })
            } else {
                res.json({
                    status: 1,
                    msg: "没有这个战队！"
                })
            }

        }
    })
})

router.post('/deleteplayer', (req, res) => {
    pool.query("delete s from player as p left join score as s on p.PID=s.CID and p.PID=?", [req.body.id], function (err, rows, fields) {
        console.log(err);
        if (err) {
            res.json({
                status: 1,
                msg: "删除失败！"
            });
        } else {
            pool.query("delete from player where PID=?", [req.body.id], function (err, rows, fields) {
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
        }
    })
})

router.get('/competition', (req, res) => {
    let querystr = "select * from competition where 1=1";
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
                id: element.CID,
                date: element.CDATA.toLocaleDateString('chinese'),
                name: element.CNAME,
                loc: element.CLOC
            });
        }, this);
        res.send(ans);
    });
});

router.post('/newcompetition', (req, res) => {

    pool.query("insert into competition (CNAME, CLOC, CDATA) values (?,?,?)", [req.body.name, req.body.loc, req.body.date], function (err, rows, fields) {
        console.log(err);
        if (err) {
            res.json({
                status: 1,
                msg: "未知错误！"
            });
        } else {
            res.json({
                status: 0
            })
        }
    })
})

router.post('/editcompetition', (req, res) => {

    pool.query("update competition set CNAME=?, CLOC=?, CDATA=? where CID=?", [req.body.name, req.body.loc, req.body.date, req.body.id], function (err, rows, fields) {
        console.log(err);
        if (err) {
            res.json({
                status: 1,
                msg: "未知错误！"
            });
        } else {
            res.json({
                status: 0
            })
        }
    })
})

router.post('/deletecompetition', (req, res) => {

    pool.query("delete s from competition as c left join score as s on c.CID=s.CID and c.CID=?", [req.body.id], function (err, rows, fields) {
        console.log(err);
        if (err) {
            res.json({
                status: 1,
                msg: "删除失败！"
            });
        } else {
            pool.query("delete from competition where CID=?", [req.body.id], function (err, rows, fields) {
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
        }
    })
})

router.get('/team/', (req, res) => {

    let querystr = "select * from team t where 1=1";
    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            querystr = querystr + " and " + key + " like '%" + req.query[key] + "%'";
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
                school: element.TSCHOOL,
                teacher: element.TTEACHER,
                person: element.TPERSON
            });
        }, this);
        res.send(ans);
    })
});

router.post('/newteam', (req, res) => {

    pool.query("insert into team (TNAME, TLOC, TSCHOOL, TTEACHER, TPERSON) values (?,?,?,?,?)", [req.body.name, req.body.loc, req.body.school, req.body.teacher, req.body.person], function (err, rows, fields) {
        console.log(err);
        if (err) {
            res.json({
                status: 1,
                msg: "未知错误！"
            });
        } else {
            res.json({
                status: 0
            })
        }
    })
})

router.post('/editteam', (req, res) => {

    pool.query("update team set TNAME=?, TLOC=?, TSCHOOL=?, TTEACHER=?, TPERSON=? where TID=?", [req.body.name, req.body.loc, req.body.school, req.body.teacher, req.body.person, req.body.id], function (err, rows, fields) {
        console.log(err);
        if (err) {
            res.json({
                status: 1,
                msg: "未知错误！"
            });
        } else {
            res.json({
                status: 0
            })
        }
    })
})

router.post('/deleteteam', (req, res) => {

    pool.query("delete s from team as t left join score as s on t.TID=s.TID and t.TID=?", [req.body.id], function (err, rows, fields) {
        console.log(err);
        if (err) {
            res.json({
                status: 1,
                msg: "删除失败！"
            });
        } else {
            pool.query("delete from team where TID=?", [req.body.id], function (err, rows, fields) {
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
        }
    })
})

router.get('/score', (req, res) => {

    let querystr = "select CDATA, CNAME, TNAME, SCORE from competition c, team t, score s where c.CID=s.CID and t.TID=s.TID";
    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            querystr = querystr + " and " + key + " like '%" + req.query[key] + "%'";
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
    pool.query("select TID from team where TNAME=?", [req.body.team], function (err, rows, fields) {
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