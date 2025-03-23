import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import RegisterClient from "./components/RegisterClient/RegisterClient";
import RegisterCrafter from "./components/RegisterCrafter/RegisterCrafter";
import { AuthProvider } from "./context/AuthContext";
import RegisterClientCrafter from "./components/RegisterClientCrafter/RegisterClientCrafter";
import CreatePost from "./components/Client/ClientComponents/CreatePost/CreatePost";
import AllPosts from "./components/Client/ClientComponents/AllPosts/AllPosts";
import UpdatePost from "./components/Client/ClientComponents/UpdatePost/UpdatePost";
import CrafterAllPosts from "./components/Crafter/CrafterComponents/CrafterAllPosts/CrafterAllPosts";
import PostDetails from "./components/Crafter/CrafterComponents/PostDetails/PostDetails";
import FindCrafters from "./components/Client/ClientComponents/FindCrafters/FindCrafters";
import CrafterWork from "./components/Crafter/CrafterComponents/CrafterWork/CrafterWork";
import CrafterProposal from "./components/Crafter/CrafterComponents/CrafterProposal/CrafterProposal";
import UploadCrafterWork from "./components/Crafter/CrafterComponents/UploadCrafterWork/UploadCrafterWork";
import CompletedWork from "./components/Client/ClientComponents/CompletedWork/CompletedWork";
import CrafterPortfolio from "./components/Client/ClientComponents/CrafterPortfolio/CrafterPortfolio";
import ClientPayment from "./components/Client/ClientComponents/ClientPayment/ClientPayment";

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
          <Route path="/crafter-all-posts" element={<CrafterAllPosts />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/crafter-work" element={<CrafterWork />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/register-crafter" element={<RegisterCrafter />} />
          <Route
            path="/crafter-proposal/:postId"
            element={<CrafterProposal />}
          />
          <Route
            path="/register-client-crafter"
            element={<RegisterClientCrafter />}
          />
          <Route
            path="/crafter/see-details/:postId"
            element={<PostDetails />}
          />
          <Route
            path="/crafter/upload-crafter-work/:postId"
            element={<UploadCrafterWork />}
          />
          <Route
            path="/client/find-crafters/:postId"
            element={<FindCrafters />}
          />
          <Route
            path="/client/completed-work/:postId/:crafterId"
            element={<CompletedWork />}
          />
          <Route
            path="/client/crafter-portfolio/:crafterId/:postId"
            element={<CrafterPortfolio />}
          />
          <Route 
          path="/client/payment" element={<ClientPayment/>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
