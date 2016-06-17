var express = require('express')
var path = require('path');
var moment = require('moment');
var app = express()
var port = process.env.PORT || 3500;

app.get('/', function(req, res) {
  var file = path.join(__dirname, 'index.html')
  res.sendFile(file, function(err) {
    if (err) {
      console.error(err)
      res.sendStatus(err.status)
    } else {
      console.log("SENT " + file)
    }
  })
})

app.get('/:dateString', function(req, res) {
  var result
  var regex = /^\d+$/g
  var date = req.params.dateString;
  date = regex.test(date) ? moment(date, 'X') : moment(date, "MMMM DD, YYYY")

  if(date.isValid()) {
    result = {
      "unix": date.format("X"),
      "natural": date.format("MMMM DD, YYYY")
    }
  } else {
    result = {
      "unix": null,
      "natural": null
    }
  }

  res.json(result)
})

app.listen(port, function() {
  console.log("Server started on port " + port + "!" )
})
