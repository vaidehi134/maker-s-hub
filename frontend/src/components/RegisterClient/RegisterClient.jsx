// import React, { useState } from "react";
// import styles from "./RegisterClient.module.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext"; //import useAuth hook

// const BASIC_URL = "http://localhost:8080/";

// const Register = () => {
//   //const { register } = useAuth(); // Access register function from AuthContext

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     lastname: "",
//     address: "",
//     city: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Function to register the client using axios
//   const registerClient = async (signupRequestDTO) => {
//     console.log(signupRequestDTO);
//     try {
//       const response = await axios.post(
//         `${BASIC_URL}client/sign-up`, // API endpoint for registering a client
//         signupRequestDTO
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error registering client:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Email validation using a regex
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailRegex.test(formData.email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     // Phone number validation (ensures 10 digits)
//     if (!/^\d{10}$/.test(formData.phone)) {
//       alert("Phone number must be 10 digits");
//       return;
//     }

//     // Passwords match validation
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const signupRequestDTO = {
//         email: formData.email,
//         password: formData.password,
//         name: formData.name,
//         lastname: formData.lastname,
//         address: formData.address,
//         city: formData.city,
//         phone: formData.phone,
//       };

//       const response = await registerClient(signupRequestDTO);

//       // Set the role to 'client' after successful registration
//      // register("client"); // Set the role to 'client'

//       alert("Registration successful: " + response.message); // Display success message
//     } catch (error) {
//       alert("Failed to register: " + error.message); // Display error message
//     }
//   };

//   return (
//     <div className={styles.register}>
//     <div className={styles.formContainer}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>First Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Last Name</label>
//           <input
//             type="text"
//             name="lastname"
//             value={formData.lastname}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Phone no</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//         <div className={styles.loginLink}>
//           <Link to="/login">login now</Link>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default Register; //here this module can be accessed with any name so here Register won't create any problem....

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import styles from "./RegisterClient.module.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext"; // Import useAuth hook
// import { ClientService } from "../Client/Services/ClientService";

// const BASIC_URL = "http://localhost:8080/";

// const Register = () => {
//   // Separate state for each form field
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [name, setName] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [address, setAddress] = useState("");
//   const [location, setLocation] = useState(""); // Added location
//   const [phone, setPhone] = useState("");
//   const [locationQuery, setLocationQuery] = useState(""); // Added location search query
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);

  

//   // Function to register the client using axios
//   const registerClient = async (signupRequestDTO) => {
//     console.log(signupRequestDTO);
//     try {
//       const response = await axios.post(
//         `${BASIC_URL}client/sign-up`, // API endpoint for registering a client
//         signupRequestDTO,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error registering client:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Email validation using a regex
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailRegex.test(email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     // Phone number validation (ensures 10 digits)
//     if (!/^\d{10}$/.test(phone)) {
//       alert("Phone number must be 10 digits");
//       return;
//     }

//     // Passwords match validation
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const signupRequestDTO = {
//         email,
//         password,
//         name,
//         lastname,
//         address,
//         location,
//         phone,
//       };

//       if (selectedLocation) {
//         signupRequestDTO.latitude = selectedLocation.lat;
//         signupRequestDTO.longitude = selectedLocation.lon;
//       }

//       const response = await registerClient(signupRequestDTO);

//       // Set the role to 'client' after successful registration
//       // register("client"); // Set the role to 'client'

//       alert("Registration successful: " + response.message); // Display success message
//     } catch (error) {
//       alert("Failed to register: " + error.message); // Display error message
//     }
//   };

//   // New function to fetch location suggestions
//   const fetchLocationSuggestions = async (query) => {
//     try {
//       const response = await ClientService.getLocationSuggestions(query);
//       setLocation(query);
//       setLocationSuggestions(response.data);
//     } catch (error) {
//       console.error("Error fetching location suggestions:", error);
//       setLocationSuggestions([]);
//     }
//   };

//   // Add debouncing for location search
//   const handleLocationQueryChange = (e) => {
//     const query = e.target.value;
//     setLocationQuery(query);

//     if (query.trim() === "") {
//       setLocationSuggestions([]);
//       return;
//     }

//     // You might want to add a debounce here for better performance
//     fetchLocationSuggestions(query);
//   };

//   // Handle location selection
//   const handleLocationSelect = (location) => {
//     setLocationQuery(location.display_name);
//     setSelectedLocation(location);
//     setLocationSuggestions([]);
//     setLocation(location.display_name);
//   };

//   return (
//     <div className={styles.register}>
//       <div>Register as Client</div>
//       <div className={styles.formContainer}>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div>
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>First Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Last Name</label>
//             <input
//               type="text"
//               value={lastname}
//               onChange={(e) => setLastname(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Address</label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </div>

//           {/* Location search section */}
//           <div className={styles.inputGroup}>
//             <label htmlFor="location" className={styles.label}>
//               City
//             </label>
//             <div style={{ position: "relative" }}>
//               <input
//                 type="text"
//                 id="location"
//                 name="location"
//                 placeholder="Enter city"
//                 value={locationQuery}
//                 onChange={handleLocationQueryChange}
//                 className={styles.inputField}
//               />

//               {locationSuggestions.length > 0 && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "100%",
//                     backgroundColor: "white",
//                     border: "1px solid #ddd",
//                     zIndex: 10,
//                     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                   }}
//                 >
//                   {locationSuggestions.map((suggestion, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         padding: "8px 12px",
//                         cursor: "pointer",
//                         borderBottom: "1px solid #ddd",
//                       }}
//                       onClick={() => handleLocationSelect(suggestion)}
//                     >
//                       {suggestion.display_name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div>
//             <label>Phone no</label>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Register</button>
//           <div className={styles.loginLink}>
//             <Link to="/login">login now</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState, useRef } from "react";
import styles from "./RegisterClient.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook
import { ClientService } from "../Client/Services/ClientService";

const BASIC_URL = "http://localhost:8080/";

const Register = () => {
  // Separate state for each form field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(""); // Added location
  const [phone, setPhone] = useState("");
  const [locationQuery, setLocationQuery] = useState(""); // Added location search query
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Create a ref for the debounce timer
  const debounceTimer = useRef(null);

  // Function to register the client using axios
  const registerClient = async (signupRequestDTO) => {
    console.log(signupRequestDTO);
    try {
      const response = await axios.post(
        `${BASIC_URL}client/sign-up`, // API endpoint for registering a client
        signupRequestDTO,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error registering client:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation using a regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Phone number validation (ensures 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    // Passwords match validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const signupRequestDTO = {
        email,
        password,
        name,
        lastname,
        address,
        location,
        phone,
      };

      if (selectedLocation) {
        signupRequestDTO.latitude = selectedLocation.lat;
        signupRequestDTO.longitude = selectedLocation.lon;
      }

      const response = await registerClient(signupRequestDTO);

      alert("Registration successful: " + response.message);
    } catch (error) {
      alert("Failed to register: " + error.message);
    }
  };

  // New function to fetch location suggestions
  const fetchLocationSuggestions = async (query) => {
    try {
      const response = await ClientService.getLocationSuggestions(query);
      setLocationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setLocationSuggestions([]);
    }
  };

  // Add debouncing for location search
  const handleLocationQueryChange = (e) => {
    const query = e.target.value;
    setLocationQuery(query);

    if (query.trim() === "") {
      setLocationSuggestions([]);
      if (debounceTimer.current !== null) {
        clearTimeout(debounceTimer.current);
      }
      return;
    }

    // Clear previous timeout if it exists
    if (debounceTimer.current !== null) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timeout with 300ms delay
    debounceTimer.current = setTimeout(() => {
      fetchLocationSuggestions(query);
    }, 600);
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setLocationQuery(location.display_name);
    setSelectedLocation(location);
    setLocationSuggestions([]);
    setLocation(location.display_name);
  };

  return (
    <div className={styles.register}>
      <div>Register as Client</div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Location search section */}
          <div className={styles.inputGroup}>
            <label htmlFor="location" className={styles.label}>
              City
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter city"
                value={locationQuery}
                onChange={handleLocationQueryChange}
                className={styles.inputField}
              />

              {locationSuggestions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    zIndex: 10,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {locationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        borderBottom: "1px solid #ddd",
                      }}
                      onClick={() => handleLocationSelect(suggestion)}
                    >
                      {suggestion.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label>Phone no</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          <div className={styles.loginLink}>
            <Link to="/login">login now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;