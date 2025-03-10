import React, { createContext, useState, useContext } from "react";
import StorageService from "../util/StorageService";

// Create the context
//AuthContext is created using createContext().
// This context will be used to share authentication-related data (like the user object) across the application.
const AuthContext = createContext();

//useAuth is a custom hook that uses the useContext hook to access the AuthContext.
// This allows any component to easily access the authentication context by calling useAuth()
export const useAuth = () => {
  return useContext(AuthContext);
};

/* AuthProvider is a provider component. This component will
 wrap your entire application and provide the authentication context to all the components inside it.(childern) */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user state holds the current user’s information

  const login = (role) => {
    // Here, set the user with a role
    setUser({ role });
  };

  const logout = () => {
    setUser(null);
    StorageService.logOut();
  };

  // const register = (role) => {
  //   // When a new user registers, you can set their role here
  //   setUser({ role });
  // };

  //The AuthContext.Provider component is used to wrap the children components and provide them with the context value.
  // The context value is an object containing user, login, logout, and register
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export default for direct usage if needed
export default AuthContext;
