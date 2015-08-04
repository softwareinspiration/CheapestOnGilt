var mongoose =       require('mongoose'),
    request =        require('request');

var MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/flashsalecalendar';

var giltnames = [];
var giltdates = [];
var ruelalanames = [];
var ruelaladates = [];
var myhabitnames = [];
var myhabitdates = [];

//MYHABIT DATA
  request.get({
    url: 'https://app.cloudscrape.com/api/runs/7aadc311-11d5-4f60-82a3-5109d3b907fd/latest/result',
    headers: {
      'X-CloudScrape-Access': 'f994895fd66b203b92243f8bc3f70d97',
      'X-CloudScrape-Account': '365db7d8-9186-4389-8c28-5666bf523010',
      'Accept': 'application/json',
      'Host': 'app.cloudscrape.com',
      'User-Agent': 'YourApp/1.0',
    }
  },
  function(error,response,body){

  var bod = JSON.parse(body);
  bod = bod.rows

  console.log(bod);

for (i=0; i<bod.length; i+=1){
  myhabitnames.push(bod[i][2]);
  myhabitdates.push(bod[i][3]);

  var currentTime = new Date()
  var d = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, currentTime.getDate());
}

// console.log(myhabitnames);
// console.log(myhabitnames[0]);
// console.log(myhabitnames[1]);
// console.log(myhabitnames[2]);
// console.log(myhabitnames);
  }
  )


  //RUELALA DATA
    request.get({
      url: 'https://app.cloudscrape.com/api/runs/ebd112a0-9855-417b-ba92-6017c7363926/latest/result',
      headers: {
        'X-CloudScrape-Access': 'f994895fd66b203b92243f8bc3f70d97',
        'X-CloudScrape-Account': '365db7d8-9186-4389-8c28-5666bf523010',
        'Accept': 'application/json',
        'Host': 'app.cloudscrape.com',
        'User-Agent': 'YourApp/1.0',
      }
    },
    function(error,response,body){

    var bod = JSON.parse(body);
    bod = bod.rows

  for (i=0; i<bod.length; i+=1){
    ruelalanames.push(bod[i][2].replace(/\n  /, '').replace(/\n/,''));
    ruelaladates.push(bod[i][3].slice(7,10));

    var currentTime = new Date()
    var d = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, currentTime.getDate(), bod[i][3].slice(7,10));
  }

  console.log(ruelalanames);
  console.log(ruelalanames[0]);
  console.log(ruelalanames[1]);
  console.log(ruelalanames[2]);
  console.log(ruelaladates);
    }
    )


  //GILT DATA
  var apiKey = "e0f5b85f64d239a5945fede8a95a3ddce8d6e952cef546b371b3b7b3ca213468";
  request.get({
  url: 'https://api.gilt.com/v1/sales/men/upcoming.json',
  headers: {
          apikey: apiKey
    }
  },
  function(error, response, body) {

    function saveCheck(err, data){
      console.log('checking');
      if (err) {
      } else {

      }
    }

var bod = JSON.parse(body);
var sales = bod.sales;


      if(sales instanceof Array){
          for(var i=0; i<sales.length;i++){
            var beg = new Date(sales[i].begins);
            // var begDay = beg.getDay();
            // var begMonth = beg.getMonth();
            // var begYear = beg.getFullYear();
            // var begTime = beg.getHours();
            //
            // dates.push(begDay+" "+begMonth+" "+begYear+" "+ begTime);
            giltdates.push(beg.toString());
            var name = sales[i].name;
            giltnames.push(name);
            // var newSale = new Sale({
            //                 title: name,
            //                 date: beg
            //                 });
            // newSale.save(function(error, data){saveCheck(err, data)
            // });
        }
        console.log(giltnames);
        console.log(giltdates);
      }
      // res.send({
      //   n: names,
      //   d: dates,
      //   })
  });
