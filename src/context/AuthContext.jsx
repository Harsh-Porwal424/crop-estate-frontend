import { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Define the AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  // Define state for the current user, initialized from localStorage or null
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updateUser = (data) =>{
    setCurrentUser(data);
  }

  // Update localStorage whenever currentUser changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Provide the currentUser and setCurrentUser function to the context consumers
  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};