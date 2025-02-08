import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import DashboardCrafter from "./components/DashboardCrafter/DashboardCrafter";
import Requests from "./components/Requests/Requests";
import Navbar from "./components/Navbar/Navbar";
import RegisterClient from "./components/RegisterClient/RegisterClient";
import RegisterCrafter from "./components/RegisterCrafter/RegisterCrafter";
import { AuthProvider } from "./context/AuthContext";
import RegisterClientCrafter from "./components/RegisterClientCrafter/RegisterClientCrafter";
import CreatePost from "./components/Client/ClientComponents/CreatePost/CreatePost";
import AllPosts from "./components/Client/ClientComponents/AllPosts/AllPosts";
import UpdatePost from "./components/Client/ClientComponents/UpdatePost/UpdatePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client/update-post/:postId" element={<UpdatePost />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/dashboard-crafter" element={<DashboardCrafter />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/register-crafter" element={<RegisterCrafter />} />
          <Route
            path="/register-client-crafter"
            element={<RegisterClientCrafter />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
