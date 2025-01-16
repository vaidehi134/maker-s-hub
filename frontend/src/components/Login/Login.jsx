import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Use the AuthContext hook for managing user state
import StorageService from "../../util/StorageService"; // Import the StorageService to manage local storage
import { notification } from "antd"; // Ant Design notification for error handling
import axios from "axios"; // Axios for making API calls

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Destructure the login method from the AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("API call for login....."); //debugging

      const response = await axios.post(
        "http://localhost:8080/authenticate",
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("retrived response"); //debugging
      console.log("response : " + response);
      console.log("response header: \n" + response.headers);

      // Extract the JWT from the response headers
      const token = response.headers["authorization"].substring(6); // Removes "Bearer"
      // "Bearer<token>"
      console.log("tokren : " + token);

      // Extract user details (userId, role) from the response body
      const user = response.data;

      // Store token and user data in localStorage
      StorageService.saveToken(token); //storage nu importing baki chhe and
      StorageService.saveUser(user);

      //logging userrole
      console.log(user);

      // Use the login function from AuthContext to update the user state
      login(StorageService.getUserRole);

      console.log("redirecting to" + StorageService.getUserRole());

      // Redirect based on user role
      if (StorageService.getUserRole() === "CLIENT") {
        navigate("/all-posts");
      } else if (StorageService.getUserRole() === "CRAFTER") {
        navigate("/dashboard-crafter");
      }

      notification.success({
        message: "Login Successful",
        description: "You have logged in successfully.",
      });
    } catch (error) {
      // Handle login failure
      notification.error({
        message: "Login Failed",
        description: error.response
          ? error.response.data.message
          : "Unknown error",
      });
      console.log("error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginbtn">
            Login
          </button>
        </form>
        <div className="register-link">
          Don't have an account?{" "}
          <a href="/register-client-crafter">Register Now</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
