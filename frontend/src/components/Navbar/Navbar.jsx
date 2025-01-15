import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the custom hook
import "./Navbar.css";
import StorageService from "../../util/StorageService";

const Navbar = () => {
  const { user, logout } = useAuth(); // Get the user and logout function from AuthContext

  return (
    <nav className="navbar">
      <div className="logo">Maker's Hub</div>
      <ul className="nav-links">
        {/* Home link is always visible */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* If user is logged in, show role-specific Navbar */}
        {user ? (
          <>
            {/* Render links based on user role */}
            {StorageService.getUserRole() === "CLIENT" ? (
              <>
                <li>
                  <Link to="/dashboard-client">Dashboard</Link>
                </li>
                <li>
                  <Link to="/create-post">Post</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard-crafter">Dashboard</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          /* Show Login and Register links if user is not logged in */
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* <li>
              <Link to="/register">Register</Link>
            </li> */}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
