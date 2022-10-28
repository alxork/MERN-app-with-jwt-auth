const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts------------------------------------------------------
exports.getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
  // array of documents from the database (in json format)
};

// GET a single workout--------------------------------------------------------
exports.getSingleWorkout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout found.' });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: 'No such workout found.' });
  }

  res.status(200).json(workout);
};

// CREATE new workout----------------------------------------------------
exports.createWorkut = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if(!title) { emptyFields.push('title') }
  if(!load) { emptyFields.push('load') }
  if(!reps) { emptyFields.push('reps') }

  if(emptyFields.length > 0) { 
    return res.status(400).json({error: 'Please fill in all the fields.', emptyFields})
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout------------------------------------------------------------------
exports.deleteWorkout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout found.' });
  }
  //   const workOutToDelete = await Workout.findByIdAndDelete(id); también funciona
  const workOutToDelete = await Workout.findByIdAndDelete({ _id: id });
  if (!workOutToDelete) {
    return res.status(404).json({ error: 'No such workout found.' });
  }
  // res.status(200).json({ message: 'Workout successfully deleted' });
  res.status(200).json(workOutToDelete);
};

// UPDATE a workout--------------------------------------------------------
exports.updateWorkout = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout found.' });
  }

  const updatedWorkout = await Workout.findByIdAndUpdate(id, {
    ...req.body,
  });

  if (!updatedWorkout) {
    return res.status(404).json({ error: 'No such workout found.' });
  }

  res.status(200).json({ message: 'Workout successfully updated' });
};
