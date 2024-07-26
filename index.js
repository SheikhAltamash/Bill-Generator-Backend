if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const BillModel = require("./model.js");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

async function main() {
  await mongoose.connect(process.env.MONGOURL);
}
main().then((res) => {
  console.log("Connected to MongoDB");
});

app.listen("8080", () => {
  console.log("Server is running on port 8080");
});
app.post("/get", async (req, res) => {
  let { formData } = req.body;
  let checkInvoice = await BillModel.findOne({ invoiceNo: formData.invoiceNo });
  if (checkInvoice) {
    console.log("There is already data stored in the database");
    res.status(201).send("New bill uploaded successfully");
  } else {
    let newBill = new BillModel(formData);
    await newBill.save();
    // let bill = await BillModel(formData);
    console.log("new bill uploaded to server");
  }
});

app.post("/invoiceCheck", async (req, res) => {
  let { invoice } = req.body;

  let checkInvoice = await BillModel.findOne({ invoiceNo: invoice });

  if (checkInvoice) {
    res.send("Invoice Number Already Registered");
  } else {
    res.send("Alright");
  }
});
app.get("/AllBills", async (req, res) => {
  let Data = await BillModel.find().sort({ date: -1 });
  console.log(JSON.stringify(Data.services));
  Data.forEach((bill) => {
    console.log(`Services: ${JSON.stringify(bill.services, null, 2)}`);
  });
  res.send(Data);
});
