import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { state, dispatch } = useAuthContext();

  const logout = () => {
    //   remove user from storage
    localStorage.removeItem('user');

    //   dispatch logout action
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};
