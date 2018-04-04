var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Port web server will listen on
const port = 8081;

//Parse requests with Body-Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.listen(port, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("Server is running on port: " + port);
});