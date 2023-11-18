import React, { useState } from "react";
import "./bookBtn.scss";

import FormModal from "../formModal/formModal";
import { UserInformation } from "../../interfaces/interfaces";
import { returnBearer } from "../../utils/utils";

// Defining the expected props for the BookBtn component
interface Props {
  onAddAppointment: (data: UserInformation) => void;
}

// Rendering a button to book appointments and a modal form
const BookBtn = (props: Props) => {
  const { onAddAppointment } = props;

  // State to manage the visibility of the modal
  const [show, setShow] = useState(false);

  // handling closing of the modal
  const handleClose = () => setShow(false);
  // handling display of the modal
  const handleShow = () => setShow(true);

  // handling form submission
  const onSubmit = async (data: Omit<UserInformation, "_id">) => {
    try {
      // Sending a POST request to create a new appointment
      const response = await fetch("/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(),
        },
        body: JSON.stringify(data),
      });

      // Parsing the response JSON
      const results = await response.json();

      if (results.error) {
        return alert(results.error);
      }

      // Closing the modal after successful form submission
      handleClose();

      onAddAppointment(results.appointment);
    } catch (error) {
      // error handling
      console.log(error);
    }
  };
  return (
    <div className="book-container">
      {/*  Button to trigger the display of the appointment booking modal  */}
      <button className="btn btn-dark mb-5" onClick={handleShow}>
        Book appointment
      </button>
      <FormModal
        show={show}
        handleClose={handleClose}
        isAdding={true}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default BookBtn;
