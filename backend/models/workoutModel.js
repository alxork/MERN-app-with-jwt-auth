const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
  //   this adds a "created at" and "updated at" property
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
