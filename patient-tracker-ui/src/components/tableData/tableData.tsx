import React, { useState } from "react";
import FormModal from "../formModal/formModal";
import { UserInformation } from "../../interfaces/interfaces";
import { returnBearer } from "../../utils/utils";

// Defining the prop types for TableData component
interface EditProps {
  onEditAppointment: (data: UserInformation[]) => void;
  data: UserInformation;
}

// Rendering a row in the table
const TableData = (props: EditProps) => {
  // Destructuring props
  const { data, onEditAppointment } = props;
  const { _id, status, name, dateTime } = data;

  // State for controlling the visibility of the modal
  const [show, setShow] = useState(false);

  // handling closing of the modal
  const handleClose = () => setShow(false);
  // handling display of the modal
  const handleShow = () => setShow(true);

  // handling form submission for editing an appointment
  const onSubmit = async (data: Omit<UserInformation, "_id">) => {
    // URL for the edit request
    const editUrl = `/appointments/${_id}`;

    try {
      // Sending a PUT request to update the appointment
      const response = await fetch(editUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(),
        },
        body: JSON.stringify(data),
      });
      // Parsing the response JSON
      const results = await response.json();

      // Displaying an error alert if the server returns an error
      if (results.error) {
        return alert(results.error);
      }

      // Calling the parent component's callback function to update the state
      onEditAppointment(results.appointments);

      // Closing the modal after submission
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // Handling cancellation of an appointment
  const onCancel = async () => {
    // Creating the URL for the cancel request using the appointment ID
    const cancelUrl = `/appointments/cancel/${_id}`;
    try {
      const response = await fetch(cancelUrl, {
        // Sending a PUT request to the server to cancel the appointment
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(),
        },
      });

      // Parsing the response JSON
      const results = await response.json();

      // Checking if the server returned an error
      if (results.error) {
        // Displaying an alert with the error message
        return alert(results.error);
      }

      // Calling the parent component's callback function to update the state with the modified appointments
      onEditAppointment(results.appointments);
      // Closing the modal after cancellation
      handleClose();
    } catch (error) {
      // error handling
      console.log(error);
    }
  };
  return (
    // rendering table data
    <tr>
      <td>{name}</td>
      <td>{dateTime}</td>
      <td>{status}</td>
      <td>
        {/* edit button */}
        <button onClick={handleShow}>
          <span className="material-symbols-outlined">edit</span>
        </button>
        {/* cancel button */}
        <button onClick={onCancel}>
          <span className="material-symbols-outlined">cancel</span>
        </button>
      </td>
      <FormModal
        show={show}
        handleClose={handleClose}
        isAdding={false}
        onFormSubmit={onSubmit}
        userData={props.data}
      />
    </tr>
  );
};

export default TableData;
