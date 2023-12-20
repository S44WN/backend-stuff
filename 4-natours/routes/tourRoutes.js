const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

//aliasing
router
  .route('/top-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

//stats -> aggregate
router.route('/difficulty').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.monthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
