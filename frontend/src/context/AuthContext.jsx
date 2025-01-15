import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook for accessing the context
// useAuth is a custom hook. A custom hook is just a function that
// uses React hooks and encapsulates logic that you can reuse in multiple components.
export const useAuth = () => {
  return useContext(AuthContext);
};

/* AuthProvider is a provider component. This component will
 wrap your entire application and provide the authentication context to all the components inside it. */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user state holds the current user’s information

  const login = (role) => {
    // Here, set the user with a role
    setUser({ role });
  };

  const logout = () => {
    setUser(null);
  };

  const register = (role) => {
    // When a new user registers, you can set their role here
    setUser({ role });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export default for direct usage if needed
export default AuthContext;
