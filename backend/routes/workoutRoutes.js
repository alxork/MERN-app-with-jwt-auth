const express = require('express');
const {
  getWorkouts,
  getSingleWorkout,
  createWorkut,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutControllers');
// import middleware function to check for user authorization

const router = express.Router();

const requireAuth = require('../middleware/requireAuth')

// Fire this middleware here before all the workout routes.
router.use(requireAuth)

router.get('/', getWorkouts);
router.get('/:id', getSingleWorkout);
router.post('/', createWorkut);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout);

module.exports = router;
