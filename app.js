//jshint esversion:6

const express = require('express');
const https = require('https');
const ejs = require("ejs");
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', function(req, res) {

  const url = "https://api.taylor.rest";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on('data', function(data) {
      const quoteData = JSON.parse(data);
      console.log(quoteData);
      const quote = quoteData.quote;

      res.render("quotes", {
        ejsQuote: quote
      })
    })
  });

});

app.listen('3000', function(req, res) {
  console.log("Server is running on port 3000");
});
