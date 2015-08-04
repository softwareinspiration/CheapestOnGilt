var express =        require('express'),
    app =            express(),
    ejs =            require('ejs'),
    bodyParser =     require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    morgan =         require('morgan'),
    mongoose =       require('mongoose'),
    session =        require('express-session'),
    request =        require('request'),
    Sale =           require('../flashsalecalendar/models/sale.js');

var PORT = process.env.PORT || 1337;
var MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/flashsalecalendar';

app.use(express.static(__dirname));

app.get('/', function(req, res){



var data = {
            giltn: giltnames,
            giltd: giltdates,
            ruelalan: ruelalanames,
            ruelalad: ruelaladates
            }

console.log(data);

res.render('index.ejs', {
                        sales: data,
                        });
})

mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function () {
  console.log("Database errors!");
});

db.once('open', function() {
    console.log('db up');
  app.listen(PORT,function() {
    console.log('1337');
  });
});
