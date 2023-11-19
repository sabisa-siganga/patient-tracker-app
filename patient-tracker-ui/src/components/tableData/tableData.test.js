import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableData from "./tableData";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ appointments: [] }),
  })
);

// Mock the returnBearer function
jest.mock("../../utils/utils", () => ({
  returnBearer: jest.fn(() => "Bearer Token"),
}));

// mock data to use in this test
const mockData = {
  _id: "23",
  status: "Active",
  name: "Sabisa Siganga",
  dateTime: "2023-11-20T09:22",
};

describe("TableData", () => {
  it("renders correctly", () => {
    render(
      <table>
        <tbody>
          <TableData data={mockData} onEditAppointment={() => {}} />
        </tbody>
      </table>
    );

    // Assert that the rendered row contains the expected data
    expect(screen.getByText("Sabisa Siganga")).toBeInTheDocument();
    expect(screen.getByText("2023-11-20T09:22")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("opens and closes the modal on edit button click", async () => {
    render(
      <table>
        <tbody>
          <TableData data={mockData} onEditAppointment={() => {}} />
        </tbody>
      </table>
    );

    // Click the edit button to open the modal
    fireEvent.click(screen.getByText("edit"));

    // Assert that the modal is displayed
    expect(screen.getByTestId("form-modal")).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText("Close"));

    // Wait for the modal to be removed from the document
    await waitFor(() => {
      expect(screen.queryByTestId("form-modal")).toBeNull();
    });
  });

  it("calls the onCancel function when cancel button is clicked", async () => {
    // Mock the fetch function to return a resolved promise with a response
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ appointments: [] }),
      })
    );

    const onEditAppointmentMock = jest.fn();
    render(
      <table>
        <tbody>
          <TableData
            data={mockData}
            onEditAppointment={onEditAppointmentMock}
          />
        </tbody>
      </table>
    );

    // Click the cancel button
    fireEvent.click(screen.getByTestId("cancel"));

    // Wait for the fetch call to be made
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Assert that the onCancel function is called
    expect(onEditAppointmentMock).toHaveBeenCalled();
  });
});
