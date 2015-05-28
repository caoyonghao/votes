exports.start = function() {
    var express = require("express");
    var app = express();

    app.post('/commit', function(req, res) {
        var path = req.query.path;
        res.send("your booking is accepted!");
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
