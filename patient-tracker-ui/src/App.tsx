import React from "react";

import "./App.scss";
import RegisterPage from "./pages/registerPage/registerPage";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn/signIn";
import AdminDashboard from "./pages/adminDashboard/adminDashboard";
import UserDashboard from "./pages/userDashboard/userDashboard";

// Creating a patient tracker app that allows doctors to track information about patients and appointments. End users can only view their appointments. Whereas an administrator can make, cancel and edit appointments and patient information

// Main App component
function App() {
  return (
    // Main container for the entire application
    <div className="app py-5">
      {/* React Router configuration for defining routes */}
      <Routes>
        {/* Route for the Sign In page */}
        <Route path="/" element={<SignIn />} />

        {/* Route for the Register page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Route for the Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Route for the User Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
