import React, { useState } from "react";
import "./RegisterCrafter.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const BASIC_URL = "http://localhost:8080/";

const Register = () => {
  const { register } = useAuth(); // Access register from AuthContext

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to register the crafter using axios
  const registerCrafter = async (signupRequestDTO) => {
    try {
      const response = await axios.post(
        `${BASIC_URL}crafter/sign-up`, // Change API endpoint to 'crafter/sign-up'
        signupRequestDTO
      );
      return response.data;
    } catch (error) {
      console.error("Error registering crafter:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation using a regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Phone number validation (ensures 10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    // Passwords match validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const signupRequestDTO = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        lastname: formData.lastname,
        address: formData.address,
        phone: formData.phone,
      };

      const response = await registerCrafter(signupRequestDTO);

      // Register user and set the role to "crafter"
      register("crafter");

      alert("Registration successful: " + response.message); // Display success message
    } catch (error) {
      alert("Failed to register: " + error.message); // Display error message
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone no</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register as Crafter</button>
        <div className="login-link">
          <Link to="/login">Login now</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
