const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.static(__dirname + '/dist/my-app'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/my-app/index.html'
  );
});
app.use(cors());
app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)