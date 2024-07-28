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
// async function main() {
//   await mongoose.connect("mongodb://localhost:27017/billGenerator");
// }
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
res.send(Data);
});
app.get("/deleteAllData", async (req, res) => {
  try {
    await BillModel.deleteMany();
    res.status(200).send({ message: "All data deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting data" });
  }
});