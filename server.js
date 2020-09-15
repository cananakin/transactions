const express = require('express');

const app = express();

const port = 3001;

app.get("/", (req, res) => {
    // read query parameters
    // craft IEX API URL
    const url = `https://sandbox-reporting.rpdpymnt.com`;
  
    // make request to IEX API and forward response
    request(url).pipe(res);
  });


app.listen(port);

console.log(`Running on port `)