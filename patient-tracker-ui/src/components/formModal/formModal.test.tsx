import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FormModal from "./formModal";

describe("Renders: <FormModal />", () => {
  it("renders the modal with the correct title when adding", () => {
    render(
      <FormModal show handleClose={() => {}} isAdding onFormSubmit={() => {}} />
    );

    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "Add appointment"
    );
  });

  it("renders the modal with the correct title when editing", () => {
    // Check if the modal has the correct title when updating
    render(
      <FormModal
        show
        handleClose={() => {}}
        isAdding={false}
        onFormSubmit={() => {}}
      />
    );

    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "Update appointment"
    );
  });

  it("handles input changes", () => {
    const onFormSubmitMock = jest.fn();

    render(
      <FormModal
        show
        handleClose={() => {}}
        isAdding
        onFormSubmit={onFormSubmitMock}
      />
    );

    // Find input fields and simulate changes
    const nameInput = screen.getByLabelText(
      "Patient Name:"
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Sabisa Siganga" } });

    const usernameInput = screen.getByLabelText(
      "Username:"
    ) as HTMLInputElement;
    fireEvent.change(usernameInput, {
      target: { value: "sabisa@gmail.com" },
    });

    const consultantInput = screen.getByLabelText(
      "Consultant:"
    ) as HTMLInputElement;
    fireEvent.change(consultantInput, { target: { value: "Dr. Sabisa" } });

    const dateTimeInput = screen.getByLabelText(
      "Date & Time:"
    ) as HTMLInputElement;
    fireEvent.change(dateTimeInput, { target: { value: "2023-01-01T12:00" } });

    // Check if the state is updated correctly
    expect(nameInput.value).toBe("Sabisa Siganga");
    expect(usernameInput.value).toBe("sabisa@gmail.com");
    expect(consultantInput.value).toBe("Dr. Sabisa");
    expect(dateTimeInput.value).toBe("2023-01-01T12:00");

    // Check if the form state is passed correctly when submitting the form
    const saveButton = screen.getByTestId("submit");
    fireEvent.click(saveButton);

    expect(onFormSubmitMock).toHaveBeenCalledWith({
      name: "Sabisa Siganga",
      username: "sabisa@gmail.com",
      consultant: "Dr. Sabisa",
      dateTime: "2023-01-01T12:00",
      status: "Active",
    });
  });
});
