// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
var router = require("express").Router();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...

app.get("/api/timestamp/", function(req, res) {
  res.json({
    unix: Number(new Date().getTime()),
    utc: new Date().toUTCString()
  });
});

app.get("/api/timestamp/:date_string?", function(req, res) {
  var date = req.params.date_string;
  if (isNaN(new Date(date).getTime()) && isNaN(Number(date))) {
    res.json({ error: "invalid date" });
  } else if (isNaN(Number(date))) {
    res.json({
      unix: Number(new Date(date).getTime()),
      utc: new Date(date).toUTCString()
    });
  } else {
    res.json({ unix: Number(date), utc: new Date(date * 1000).toUTCString() });
  }
  console.log(Number(new Date(date).getTime()));
});

//router.route("/api/timestamp/:id").get((req,res)=>{
//  var date = req.params.id
//  date.save()
//  .then(res=>res.json({date: date}))
//  .catch(err=>console.log(err))
//})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
