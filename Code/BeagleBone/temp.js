var b = require('bonescript');
var pg = require('pg');

var client = new pg.Client({
    host: 'baylor-baja-daq-server.postgres.database.azure.com',
    user: 'dmac77@baylor-baja-daq-server',
    password: 'Gymnastics123#@!',
    database: 'SensorData',
    port: 5432,
    ssl: false
});
client.connect(function(err) {
    if (err) {
        return console.log(err);
    }
    setInterval(readTemp, 2000);
});

function readTemp() {
    b.analogRead('P9_39', displayTemp);
}

function displayTemp(reading) {
    var millivolts = reading.value * 1800;
    var tempC = (millivolts - 500) / 10;
    var tempF = (tempC * 9/5) + 32
    console.log("Temp C=" + tempC + "\tTemp F=" + tempF);
    client.query('INSERT INTO temperature (fahrenheit, timestamp) VALUES ($1, $2)', [tempF, new Date()], function (err, result) {
        if (err) {
            console.log(err);
        }
    });
}