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

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

//users handlers
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "Route isn't defines yet",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "Route isn't defines yet",
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "Route isn't defines yet",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "Route isn't defines yet",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "Route isn't defines yet",
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
