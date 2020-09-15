const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(__dirname + '/dist/transactions'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/transactions/index.html'
  );
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)