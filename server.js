const express = require('express');

const app = express();

app.use(express.static('./dist/transactions-reports'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/transactions-reports' }
  );
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)