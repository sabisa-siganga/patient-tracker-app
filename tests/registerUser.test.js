const request = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const app = require("../app");

//test for user registration
describe("User Registration", () => {
  it("should register a new user", async () => {
    const newUser = {
      username: "testuser@gmail.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/register")
      .send(newUser)
      .expect(201);

    // Ensure the response contains the success message
    expect(response.body.message).toBe("Successfully registered the user");

    // Check if the user exists in the database
    const user = await User.findOne({ username: newUser.username });
    expect(user).toBeTruthy();

    // Check if the user's password is encrypted
    const isPasswordValid = await bcrypt.compare(
      newUser.password,
      user.password
    );
    expect(isPasswordValid).toBe(true);

    await user.deleteOne();
  }, 10000);

  it("should handle registration failure", async () => {
    // Sending a request with missing or invalid data
    const invalidUser = {
      // Missing password
      username: "invaliduser@gmail.com",
    };

    const response = await request(app)
      .post("/register")
      .send(invalidUser)
      .expect(403);

    // Ensure the response contains the error message
    expect(response.body.error).toBe("password required");
  });

  it("should handle internal server error", async () => {
    // Simulating an unexpected error in the controller
    jest.spyOn(User.prototype, "save").mockImplementationOnce(() => {
      throw new Error("Unexpected error");
    });

    const newUser = {
      username: "testuser@gmail.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/register")
      .send(newUser)
      .expect(500);

    // Ensure the response contains the error message
    expect(response.body.error).toBe("Internal Server Error");
  });
});
