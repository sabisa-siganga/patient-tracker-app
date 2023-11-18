import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import Header from "./header";
import { BrowserRouter } from "react-router-dom";

describe("Renders: <Header />", () => {
  it("renders the header with the correct user", () => {
    const currentUser = "John Doe";

    render(
      <BrowserRouter>
        <Header currentUser={currentUser} />
      </BrowserRouter>
    );

    // Check if the header text is rendered
    expect(screen.getByText(currentUser)).toBeInTheDocument();

    // Check if the SignoutBtn component is rendered
    expect(
      screen.getByRole("button", { name: /Sign Out/i })
    ).toBeInTheDocument();
  });

  it("Taking a snapshot", () => {
    const currentUser = "John Doe";

    const tree = renderer
      .create(
        <BrowserRouter>
          <Header currentUser={currentUser} />
        </BrowserRouter>
      )
      .toJSON();

    // Check if the snapshot matches the rendered component
    expect(tree).toMatchSnapshot();
  });
});
