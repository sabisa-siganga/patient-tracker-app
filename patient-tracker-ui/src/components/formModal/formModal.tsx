import React, { useState } from "react";

import "./formModal.scss";
import { Modal, Form, Button } from "react-bootstrap";
import { UserInformation } from "../../interfaces/interfaces";

// props interface
interface Props {
  show: boolean;
  handleClose: () => void;
  isAdding: boolean;
  onFormSubmit: (data: Omit<UserInformation, "_id">) => void;

  /**
   * Data representing patient info to be edited and is used when editing an existing appointment.
   */
  userData?: UserInformation;
}

const FormModal = (props: Props) => {
  const { show, handleClose, isAdding, onFormSubmit, userData } = props;

  // defining default form state
  const defaultFormState: Omit<UserInformation, "_id"> = {
    username: "",
    name: "",
    consultant: "",
    dateTime: "",
    status: "Active",
  };

  // State to manage form fields
  const [formField, setForm] = useState<
    UserInformation | Omit<UserInformation, "_id">
  >(userData || defaultFormState);

  /**
   * accessing the input value and name
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    // updating the state
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /**
   * Handle form submission
   */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formField);
  };

  return (
    <>
      {/* Modal to add or edit appointment */}
      <Modal show={show} onHide={handleClose} data-testid="form-modal">
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title data-testid="modal-title">
              {isAdding ? "Add appointment" : "Update appointment"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Form inputs for patient information */}
            <Form.Group className="mb-3" controlId="formInput.ControlInput1">
              <Form.Label>Patient Name: </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="name"
                value={formField.name}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInput.ControlInput2">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="email"
                autoFocus
                name="username"
                value={formField.username}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInput.ControlInput3">
              <Form.Label>Consultant:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="consultant"
                value={formField.consultant}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInput.ControlInput4">
              <Form.Label>Date & Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                autoFocus
                name="dateTime"
                value={formField.dateTime}
                onChange={onChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {/* close button */}
            <Button
              variant="secondary"
              data-testid="close"
              onClick={handleClose}
            >
              Close
            </Button>

            {/* Save button */}
            <Button variant="primary" data-testid="submit" type="submit">
              {isAdding ? "Save" : "Save changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default FormModal;
