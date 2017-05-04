var express     = require('express');  
var app         = express();  
var mongoose     = require('mongoose');
var Twitter = require('twitter');

mongoose.connect('mongodb://158.49.112.86:27017/tiempoatmosferico');

app.configure(function() {  
    app.use(express.logger('dev')); 
    app.use(express.bodyParser());
    app.use(express.methodOverride());                  
});



var Tiempo = mongoose.model('Tiempo', {  
    temp_grados_celsius: String,
    temp_grados_farenheit: String,
    humedad: String,
    presion: String,
    velocidad_viento: String,
    direccion: String,
    temp_sensor: String,
    humedad_sensor: String,
    date: {
        type: Date,
        default: Date.now
    }
});



app.get('/api/tiempo', function(req, res) {  
    Tiempo.find(function(err, tiempos) {
        if(err) {
            res.send(err);
        }
        res.json(tiempos);
    });


});


app.post('/api/tiempo', function(req, res) {  
    Tiempo.create({
        temp_grados_celsius: req.body.temp_grados_celsius,
        temp_grados_farenheit: req.body.temp_grados_farenheit,
        humedad: req.body.humedad,
        presion: req.body.presion,
        velocidad_viento: req.body.velocidad_viento,
        direccion: req.body.direccion

    }, function(err, tiempo){
        if(err) {
            res.send(err);
        }

        Tiempo.find(function(err, tiempos) {
            if(err){
                res.send(err);
            }
            res.json(tiempos);
        });
    });
});


app.post('/api/tiempo/sensor', function(req, res) {  
    Tiempo.create({
        temp_sensor: req.body.temp_sensor,
        humedad_sensor: req.body.humedad_sensor
    }, function(err, tiempo){
        if(err) {
            res.send(err);
        }

        Tiempo.find(function(err, tiempos) {
            if(err){
                res.send(err);
            }
            res.json(tiempos);
        });
    });
});




app.listen(8080, function() {  
    console.log('App listening on port 8080');
});


