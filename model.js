const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String, },
 
  price: { type: Number, default: 0 },
});

const billSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  invoiceNo: { type: String, required: true },
  date: { type: Date, required: true },
  total: { type: Number },
  subTotal:{type:Number},
  services: [serviceSchema],
  gst: { type: Boolean },
  gstNo: { type: String },
  typeOfService:{type:String}
});

const BillModel = mongoose.model("bills", billSchema);
module.exports = BillModel;
