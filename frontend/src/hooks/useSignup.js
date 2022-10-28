import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const { state, dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/signup', {
      // !We don't put localhost:4000 because we already defined a proxy on our package.json -> "proxy": "http://localhost:4000"
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json(); //this info contains the jwt token also.
    /*Note that despite the method being named json(), 
    the result is not JSON but is instead the result of taking JSON
     as input and parsing it to produce a JavaScript object.*/
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //   Save user to localStorage
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};

// JSON.stringify() converts JS objets or values into a JSON string chain.
