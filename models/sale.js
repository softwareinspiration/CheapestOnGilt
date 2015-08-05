var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var saleSchema = Schema({
  sale_name: {type: String},
  item_name: {type: String},
  item_link: {type: String},
  item_picture: {type:String},
  msrp_price: {type: Number},
  sale_price: {type: Number},
  inventory_status: {type: String}
});

var Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
