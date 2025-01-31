const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

//read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data wriiten succesfully');
  } catch (error) {
    console.log(error);
  }
  process.exit(); // force ending process
};

//delete all data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('All data erased');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//work with arg given during runtime
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.env);
