const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const User = require("../models/user");

const loginCredentials = {
  username: "testuser2@gmail.com",
  password: "testpassword",
};

describe("Login Endpoint", () => {
  it("should login a user with valid credentials", async () => {
    // register user in the database
    const registeredUser = new User({
      username: loginCredentials.username,
      password: await bcrypt.hash(loginCredentials.password, 10),
    });
    await registeredUser.save();

    const response = await request(app)
      .post("/signin")
      .send(loginCredentials)
      .expect(200);

    // Ensure the response contains the user details and a token
    expect(response.body.user).toBeTruthy();
    expect(response.body.token).toBeTruthy();

    // Clean up: delete the registered user
    await registeredUser.deleteOne();
  }, 10000);

  it("should return an error for invalid credentials", async () => {
    const invalidCredentials = {
      username: "nonexistentuser@gmail.com",
      password: "invalidpassword",
    };

    const response = await request(app)
      .post("/signin")
      .send(invalidCredentials)
      .expect(401);

    // Ensure the response contains the expected error message
    expect(response.body.error).toBe("User is not found");
  });

  it("should return an error for incorrect password", async () => {
    const registeredUser = new User({
      username: loginCredentials.username,
      password: await bcrypt.hash(loginCredentials.password, 10),
    });
    await registeredUser.save();

    const invalidCredentials = {
      username: loginCredentials.username,
      password: "incorrectpassword",
    };

    const response = await request(app)
      .post("/signin")
      .send(invalidCredentials)
      .expect(400);

    // Ensure the response contains the expected error message
    expect(response.body.error).toBe("Incorrect password");

    // Clean up: delete the registered user
    await registeredUser.deleteOne();
  }, 5000);
});
