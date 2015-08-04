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

  var apiKey = "e0f5b85f64d239a5945fede8a95a3ddce8d6e952cef546b371b3b7b3ca213468";

  function saveCheck(err, data){
    console.log('checking');
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }

  request.get("https://api.gilt.com/v1/sales/men/upcoming.json",
  {apikey: 'e0f5b85f64d239a5945fede8a95a3ddce8d6e952cef546b371b3b7b3ca213468'},
  function(error, response, body) {
    var sales = body.sales;
    console.log('hey');
    console.log(body);
    if(sales instanceof Array){
      console.log('ho');
        for(var i=0; i<sales.length;i++){
          console.log('entering loop');
          var beg = new Date(sales[i].begins);
          console.log(beg);
          var name = sales[i].name;
          console.log(name);
          var newSale = new Sale({
                          title: sales[i].name,
                          date: sales[i].begins
                          });
          newSale.save(saveCheck(err, data));
      }
    }
    res.render('index.ejs', {data: sales});
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
