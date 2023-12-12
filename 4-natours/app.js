const fs = require('fs');
const express = require('express');

const port = 3000;
const app = express();
app.use(express.json()); //middleware

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: tours,
  });
};

//add get request at /api/v1/tours endpoint
app.get('/api/v1/tours', getAllTours);

//to get a tour
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // converts to a num
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: tour,
  });
});

//patch
app.patch('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params.id);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '< updated tour >',
    },
  });
});

//delete
app.delete('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params.id);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//add post request to api/v1/tours endpoint
app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body); //logs body provided
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
