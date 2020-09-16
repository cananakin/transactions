const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
  
app.use(express.static(__dirname + '/dist/my-app'));

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/my-app/index.html');
});

app.use(cors());
app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)