exports.start = function() {
    var express = require("express");
    var app = express();

    var xlsxManager = require('./xlsxManager.js');
    xlsxManager.init();
    app.post('/commit', function(req, res) {
        if (!req.query.name || !req.query.id) {
            res.send("invalid param");
        } else {
            var info = [req.query.name, req.query.id, req.query.remark];
            xlsxManager.add(info);
            res.send("your booking is accepted!");
        }
    })

    app.get('/commit', function(req, res) {
        res.send(xlsxManager.get());
    })

    app.get('/*.*', function(req, res) {
        var options = {
            root: './webapp/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        var fileName = req.path;
        res.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            }
            else {
                console.log('Sent:', fileName);
            }
        });
    });
    var server = app.listen('3000');
    return server;
}
