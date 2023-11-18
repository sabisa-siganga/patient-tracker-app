import React, { useEffect, useState } from "react";
import "./adminDashboard.scss";
import Header from "../../components/header/header";
import BookBtn from "../../components/bookBtn/bookBtn";
import { Table } from "react-bootstrap";
import TableData from "../../components/tableData/tableData";
import { UserInformation } from "../../interfaces/interfaces";
import { checkIsLogin, returnBearer } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

// Handling the Admin Dashboard
const AdminDashboard = () => {
  // State to manage user data and current logged-in user
  const [userData, setUserData] = useState<UserInformation[]>([]);
  const [currentUser, setCurrentUser] = useState("");

  // React Router hook for navigation
  const navigate = useNavigate();
  // fetching all appointments from the server
  const getAllAppointments = async () => {
    // Sending a GET request to fetch all appointments
    try {
      const response = await fetch("/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(), // Including authorization token in headers
        },
      });
      // Parsing the response JSON
      const results = await response.json();

      // Checking if the server returned an error
      if (results.error) {
        // Displaying an alert with the error message
        return alert(results.error);
      }

      // Updating the user data state with the fetched appointments
      setUserData(results.appointments);
    } catch (error) {
      // error handling
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

    // Setting the current logged-in user and fetching all appointments
    setCurrentUser(verifyUser.username);
    getAllAppointments();
  }, [navigate]);

  // Adding a new appointment to the user data state
  const addAppointment = (data: UserInformation) => {
    // Updating the user data state by creating a new array with the new appointment data
    setUserData((prev) => {
      return [...prev, data];
    });
  };

  // Editing appointments and update the user data state
  const editAppointment = (data: UserInformation[]) => {
    // Updating the user data state with the modified appointments
    setUserData(data);
  };

  // Rendering the Admin Dashboard component
  return (
    <div className="admin-container">
      {/* Header component with a welcome message for the current user */}
      <Header currentUser={`Welcome, ${currentUser}`} />
      {/* book appointment button */}
      <BookBtn onAddAppointment={addAppointment} />
      {/* Title for the appointments section */}
      <p className="mb-5">Patient appointments</p>
      {/* Container for displaying patients appointments using the table*/}
      <div className="table-container">
        {/* table to display patient appointments */}
        <Table striped hover>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => {
              return (
                // table data
                <TableData
                  key={index}
                  data={item}
                  onEditAppointment={editAppointment}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
