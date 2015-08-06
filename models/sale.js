var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var saleSchema = Schema({
  start_date: {type: Date},
  end_date: {type: Date},
  days_old: {type: Number},
  sale_name: {type: String},
  sale_store: {type: String},
  item_brand: {type: String},
  item_name: {type: String},
  item_link: {type: String},
  item_picture: {type:String},
  msrp_price: {type: Number},
  sale_price: {type: Number},
  percent_discount: {type: Number},
  inventory_status: {type: String},
  categories: {type: Array}
});

var Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
