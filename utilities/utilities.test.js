const jwt = require("jsonwebtoken");
const { produceToken } = require("./utilities");

// Mock process.env.SECRET_KEY for testing purposes
process.env.SECRET_KEY = "234567897";

describe("produceToken Function", () => {
  it("produces a valid JWT token", () => {
    // Mock the jwt.sign function to return a constant value for testing
    jwt.sign = jest.fn(() => "mocked_token");

    const userId = "1";
    const role = "admin";
    const expiresIn = "30d";

    // Call the function
    const token = produceToken(userId, role);

    // Check if jwt.sign was called with the correct parameters
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId, role },
      process.env.SECRET_KEY,
      {
        expiresIn: expiresIn,
      }
    );

    // Check if the produced token matches the expected value
    expect(token).toBe("mocked_token");
  });
});
