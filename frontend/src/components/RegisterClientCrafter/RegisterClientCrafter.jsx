import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterClientCrafter.css"; // Import the CSS for styling

const RegisterClientCrafter = () => {

  
  const navigate = useNavigate();

 

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Choose Your Role</h2>
        <div className="register-options">
          <Link to="/register-client">
            <button
              className="register-btn"
              onClick={() => {
                navigate("/register-client");
              }}
            >
              Register as Client
            </button>
          </Link>
          <Link to="/register-crafter">
            <button
              className="register-btn"
              onClick={() => {
                  navigate("register-crafter");
              }}
            >
              Register as Crafter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterClientCrafter;
