var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var saleSchema = Schema({
  title: {type: String},
  date: {type: String},
  categories: {type: Array}
});

var Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
