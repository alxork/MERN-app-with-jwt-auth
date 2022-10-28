import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    //this info comming from the backend contains email and jwt token.
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //   Save user to localStorage
      localStorage.setItem('user', JSON.stringify(json));
      //{"email":"mies@mies.com", "token":"u43ih5345kj43j5kh"}
      dispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};

// JSON.stringify() converts JS objets or values into a JSON string chain.
