require('dotenv').config();
const express = require('express');
const routes = require('./routes/workoutRoutes');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, '-', req.method);
  next();
});

// Routes
app.use('/api/workouts', routes);
// Connect to DB

const MONGO_URI = process.env.MONGO_URI || 'Set up your mongo db to get the URI.'

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the DB');
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
