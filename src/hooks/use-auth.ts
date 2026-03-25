import { useMemo } from "react";
import { useAuthProfile } from "../pages/auth-page/state/auth-state";

export const useAuth = () => {
  const {
    currentUser,
    users,
    isLoading,
    error,
    register,
    login,
    logout,
    clearError,
  } = useAuthProfile();

  return useMemo(
    () => ({
      user: currentUser,
      isAuthenticated: !!currentUser,
      users,
      isLoading,
      error,
      register,
      login,
      logout,
      clearError,
    }),
    [currentUser, users, isLoading, error, register, login, logout, clearError]
  );
};
