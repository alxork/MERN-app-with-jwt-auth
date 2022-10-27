import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      //-------------------------------------------
      const response = await fetch('/api/workouts');
      /*we make this api call with the proxy property we put in package json.
      This allows avoiding also the CORS error.*/
      const json = await response.json();
      // full array of workouts comming from mongoDB
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((w) => <WorkoutDetails key={w._id} workout={w} />)}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
