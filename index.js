var express = require('express')
var path = require('path');
var moment = require('moment');
var app = express()

var port = process.env.PORT || 8000;

app.get('/', function(req, res) {
  var file = path.join(__dirname, 'index.html')
  res.sendFile(file, function(err) {
    if (err) {
      console.log(err)
      res.sendStatus(err.status)
    } else {
      console.log("SENT " + file)
    }
  })
})

app.get('/:dateString', function(req, res) {
  var date;
  if (/^\d+$/g.test(req.params.dateString)) {
    var date = moment(req.params.dateString, 'X')
  } else {
    var date = moment(req.params.dateString, "MMMM DD, YYYY")
  }

  if(date.isValid()) {
    res.json({
      "unix": date.format("X"),
      "natural": date.format("MMMM DD, YYYY")
    })
  } else {
    res.json({
      "unix": null,
      "natural": null
    })
  }
})

app.listen(port, function() {
  console.log("Server started on port " + port + "!" )
})
