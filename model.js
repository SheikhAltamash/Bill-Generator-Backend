const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  selected: { type: Boolean, default: false },
  type: { type: String, default: "" },
  amount: { type: Number, default: 0 },
});

const billSchema = new Schema({
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerEmail: { type: String, required: true },
  invoiceNo: { type: String, required: true },
  date: { type: Date, required: true },
  total: { type: Number },
  services: {
    videoEditing: {
      selected: { type: Boolean, default: false },
      minutes: { type: Number, default: 0 },
      quality: { type: String, default: "" },
      amount: { type: Number, default: 0 },
    },
    photoEditing: {
      selected: { type: Boolean, default: false },
      photos: { type: Number, default: 0 },
      quality: { type: String, default: "" },
      amount: { type: Number, default: 0 },
    },
    graphicDesigning: {
      selected: { type: Boolean, default: false },
      type: { type: String, default: "" },
      amount: { type: Number, default: 0 },
    },
    gst: { selected: { type: Boolean, default: false } },
  },
});

const BillModel = mongoose.model("bills", billSchema);
module.exports = BillModel;
