// import React, { useState } from "react";
// import styles from "./RegisterCrafter.module.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// const BASIC_URL = "http://localhost:8080/";

// const Register = () => {
//   //const { register } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [name, setName] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [address, setAddress] = useState("");
//   const [skills, setSkills] = useState("");
//   const [phone, setPhone] = useState("");
//   const [locationQuery, setLocationQuery] = useState(""); // Added location search query
//   const [location, setLocation] = useState(""); // Added location
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   // const [formData, setFormData] = useState({
//   //   email: "",
//   //   password: "",
//   //   confirmPassword: "",
//   //   name: "",
//   //   lastname: "",
//   //   address: "",
//   //   location: "",
//   //   phone: "",
//   //   skills: "", // New field for skills
//   // });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const registerCrafter = async (signupRequestDTO) => {
//     try {
//       const response = await axios.post(
//         `${BASIC_URL}crafter/sign-up`,
//         signupRequestDTO
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error registering crafter:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailRegex.test(formData.email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     if (!/^\d{10}$/.test(formData.phone)) {
//       alert("Phone number must be 10 digits");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
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
//         skills,
//       };

//       if (selectedLocation) {
//         signupRequestDTO.latitude = selectedLocation.lat;
//         signupRequestDTO.longitude = selectedLocation.lon;
//       }

//       const response = await registerCrafter(signupRequestDTO);

//       // register("crafter");
//       alert("Registration successful: " + response.message);
//     } catch (error) {
//       alert("Failed to register: " + error.message);
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
//       <div className={styles.formContainer}>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div>
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>First Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Last Name</label>
//             <input
//               type="text"
//               name="lastname"
//               value={formData.lastname}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Address</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           {/* <div>
//             <label>City</label>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               required
//             />
//           </div> */}

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
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Skills (comma-separated)</label>
//             <input
//               type="text"
//               name="skills"
//               value={formData.skills}
//               onChange={handleChange}
//               placeholder="e.g., Woodworking, Carving, Metalwork"
//             />
//           </div>
//           <button type="submit">Register as Crafter</button>
//           <div className={styles.loginLink}>
//             <Link to="/login">Login now</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useRef, useState } from "react";
import styles from "./RegisterCrafter.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ClientService } from "../Client/Services/ClientService"; // Make sure this import is correct

const BASIC_URL = "http://localhost:8080/";

const Register = () => {
  // Separate state for each form field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [phone, setPhone] = useState("");
  const [locationQuery, setLocationQuery] = useState(""); // Added location search query
  const [location, setLocation] = useState(""); // Added location
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  
    // Create a ref for the debounce timer
    const debounceTimer = useRef(null);

  // Function to register the crafter using axios
  const registerCrafter = async (signupRequestDTO) => {
    try {
      const response = await axios.post(
        `${BASIC_URL}crafter/sign-up`,
        signupRequestDTO,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
        skills,
      };

      if (selectedLocation) {
        signupRequestDTO.latitude = selectedLocation.lat;
        signupRequestDTO.longitude = selectedLocation.lon;
      }

      const response = await registerCrafter(signupRequestDTO);

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
          <div>
            <label>Skills (comma-separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., Woodworking, Carving, Metalwork"
            />
          </div>
          <button type="submit">Register as Crafter</button>
          <div className={styles.loginLink}>
            <Link to="/login">Login now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;