const fs = require('fs');
const express = require('express');

const port = 3000;
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//add get request at /api/v1/tours endpoint
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: tours,
  });
});

//add post request to api/v1/tours endpoint

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
