const uuidv4 = require('uuid/v4');

var bodyParser = require("body-parser");

var express = require('express');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Accept", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/', function(req, res) {
    // console.log("req.body parsed", JSON.parse(req.body))
    console.log("req.body", req.body)
    console.log("in GET")
    setTimeout(() => {
        console.log("send data")
        res.send({ "some": uuidv4() });
    }, 6000)

});

app.get('/rr', function(req, res) {
    // console.log("req.body parsed", JSON.parse(req.body))
    console.log("req.body", req.body)
    console.log("in GET")
    setTimeout(() => {
        console.log("send data")
        res.send({ "some": uuidv4() });
    }, 6000)

});

app.listen(3000, function() {
    console.log('listening on port 3000!');
});