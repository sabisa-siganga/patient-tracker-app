const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const User = require("../models/user");
const { produceToken } = require("../utilities/utilities");
const Appointment = require("../models/appointments");

// Mock user data for testing
const userData = {
  username: "test-appointment-user@gmail.com",
  password: "testpassword",
};
let registeredUser;
let userToken = "";
let appointmentId = "";

describe("Appointments", () => {
  beforeAll(async () => {
    // Create a user in the database to use for authentication
    registeredUser = new User({
      username: userData.username,
      password: await bcrypt.hash(userData.password, 10),
    });

    await registeredUser.save();

    userToken = produceToken(registeredUser._id, registeredUser.role);
  }, 10000);

  afterAll(async () => {
    // Clean up: delete the registered user
    await registeredUser.deleteOne();

    if (appointmentId) {
      await Appointment.deleteOne({
        _id: appointmentId,
      });
    }
  }, 10000);

  it("should add a new appointment", async () => {
    // Mock user data for testing
    const adminData = {
      username: "admin@gmail.com",
      password: "admin",
    };

    const user = await request(app).post("/signin").send(adminData).expect(200);

    // Use the created user's credentials for authentication in the request
    const response = await request(app)
      .post("/appointments")
      .set("Authorization", `Bearer ${user.body.token}`)
      .send({
        name: "John Doe",
        username: userData.username,
        dateTime: "2023-12-01 10:00:00",
      })
      .expect(201);

    // Ensure the response contains the added appointment
    expect(response.body.appointment).toBeTruthy();
    expect(response.body.appointment.name).toBe("John Doe");
    expect(response.body.appointment.username).toBe(userData.username);
    expect(response.body.appointment.dateTime).toBe("2023-12-01 10:00:00");
    expect(response.body.appointment.consultant).toBe(adminData.username);
    expect(response.body.appointment.status).toBe("Active");
    expect(response.body.message).toBe("Appointment added successfully");

    appointmentId = response.body.appointment._id;
  }, 10000);

  it("should fetch user appointments within the last 30 days", async () => {
    // Fetch user appointments again after adding a new appointment
    const updatedResponse = await request(app)
      .get("/my-appointments")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Content-Type", "application/json")
      .expect(200);

    // Ensure the updated response contains the new appointment
    expect(updatedResponse.body.appointments).toBeTruthy();
    expect(updatedResponse.body.appointments).toHaveLength(1);
    expect(updatedResponse.body.appointments[0].username).toBe(
      userData.username
    );
  });
});
