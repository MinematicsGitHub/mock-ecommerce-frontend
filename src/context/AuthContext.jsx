import { createContext, useContext, useEffect, useState } from "react";
import { getStoredUsers, loginUser, logoutUser, registerUser } from "../utils/auth";
import { readStorage, storageKeys } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setCurrentUser(readStorage(storageKeys.currentUser, null));
    setUsers(getStoredUsers());
  }, []);

  const register = (formData) => {
    const result = registerUser(formData);
    if (result.ok) {
      setCurrentUser(result.user);
      setUsers(getStoredUsers());
    }
    return result;
  };

  const login = (formData) => {
    const result = loginUser(formData);
    if (result.ok) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        users,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
