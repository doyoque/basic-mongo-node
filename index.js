require("dotenv").config();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var port = 3000;
const express = require("express");
const app = express();
const router = express.Router();

var db_connect = `mongodb+srv://doyoque:${process.env.DB_PASSWORD}@cluster0-kleby.mongodb.net/${process.env.DB_USERNAME}?retryWrites=true&w=majority`;

mongoose.connect(db_connect, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected to DB");

	// test add data
	const contentSchema = new mongoose.Schema({
	  name: String,
	  title: String,
	});

	const Contents = mongoose.model("Content", contentSchema);
	const sampleContent = new Contents({ name: 'simple_text', title: 'a simple text' });

	sampleContent.save(function (err, content) {
		if (err) return console.log(err);
		console.log(content);
	});
});

// var Airbnb = mongoose.model("listingsAndReviews", new Schema());
// Airbnb.find({}, function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
// var airbnbModel = mongoose.model("listingsAndReviews", airbnbSchema);

// airbnbModel.find(function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// Content.find(function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

app.use("/", router);

// app.listen(port, function () {
//   console.log("Server is running on Port: " + port);
// });
