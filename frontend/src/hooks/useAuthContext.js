// Helper function to easy get access to the context → to "consume" the context.

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside a AuthContextProvider');
  }

  return context;
};
