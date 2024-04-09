const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  Intake_Request_NO:String,
  Date:String,
  Employee_name:String,
  Employee_email:String,
  Intake_Request_Document:String,
  Assigned_to:String,
  Status:String
});

const bookModel = mongoose.model("books3", bookSchema);
module.exports = bookModel;
