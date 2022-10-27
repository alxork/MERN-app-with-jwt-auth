const express = require('express');
const router = express.Router();
const {
  getWorkouts,
  getSingleWorkout,
  createWorkut,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutControllers');

router.get('/', getWorkouts);
router.get('/:id', getSingleWorkout);
router.post('/', createWorkut);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout);

module.exports = router;
