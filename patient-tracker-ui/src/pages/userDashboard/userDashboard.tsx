import React, { useEffect, useState } from "react";
import "./userDashboard.scss";
import Header from "../../components/header/header";
import Card from "../../components/card/card";
import { checkIsLogin, returnBearer } from "../../utils/utils";
import { UserInformation } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

// User Dashboard
const UserDashboard = () => {
  // React Router hook for navigation
  const navigate = useNavigate();
  // State to manage user appointments, current user, and fetch appointments
  const [appointments, setAppointments] = useState<UserInformation[]>([]);
  const [currentUser, setCurrentUser] = useState("");

  // fetch user appointments from the server
  const fetchAppointments = async () => {
    // Sending a GET request to fetch user appointments
    try {
      const response = await fetch("/my-appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(), //Including authorization token in headers
        },
      });
      // Parsing the response JSON
      const results = await response.json();

      // Checking for errors in the response and displaying an alert if there is an error
      if (results.error) {
        return alert(results.error);
      }

      // Updating the state with the fetched appointments
      setAppointments(results.appointments);
    } catch (error) {
      // handle errors
      console.log(error);
    }
  };

  // useEffect hook to run actions on component mount
  useEffect(() => {
    // Checking if the user is logged in
    const verifyUser = checkIsLogin();

    // Redirecting to the login page if the user is not logged in
    if (!verifyUser.loggedIn) {
      return navigate("/");
    }

    // Setting the current logged-in user and fetching user appointments
    setCurrentUser(verifyUser.username);
    fetchAppointments();
  }, [navigate]);

  // Rendering the User Dashboard component
  return (
    <div className="user-container">
      {/* Header component with a welcome message for the current user */}
      <Header currentUser={`Welcome,  ${currentUser}`} />
      {/* Title for the user appointments section */}
      <p className="user-title mb-5">Patient appointments</p>
      {/* Container for displaying user appointments using Card components */}
      <div className="cards-container">
        {/* Mapping through user appointments and rendering a Card component for each */}
        {appointments.map((appointment, index) => {
          return (
            <Card
              key={index}
              consultant={appointment.consultant}
              dateTime={appointment.dateTime}
              status={appointment.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;
