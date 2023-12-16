const mongoose = require('mongoose');
const app = require('./app');

// if (process.env.DATABASE === 'mongodb://localhost:27017/express') {
//   console.log(process.env.DATABASE);
// }
if (process.env.NODE_ENV === 'development') {
  console.log('hello');
}

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection succesful!');
  })
  .catch(err => {
    console.log(`"ERROR:"`, err);
  });

//defining tour Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Tour name is required!'] // [value, "msg when error occurs"]
  },
  rating: {
    type: Number,
    default: 4.7
  },
  price: {
    type: Number,
    required: true
  }
});

//creating tour model
const Tour = mongoose.model('Tour', tourSchema);

//creating a tour instance
const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497
});

//testtour saving
testTour
  .save()
  .then(() => {
    console.log('saved successfully');
  })
  .catch(err => {
    console.log(err);
  });

//
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
