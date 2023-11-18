// import the 'jsonwebtoken' library to work with JSON Web Tokens
const jwt = require("jsonwebtoken");

// Define the default token expiration duration
const DEFAULT_EXPIRES_IN = "30d";

// produce a JWT token with the provided user details
const produceToken = (userId, role) => {
  // Sign the token using the SECRET_KEY from environment variables and set its expiration
  return jwt.sign({ userId, role }, process.env.SECRET_KEY, {
    expiresIn: DEFAULT_EXPIRES_IN, // Set the token's expiration duration
  });
};

// Export the 'produceToken' function to be accessed by  other parts of the application
module.exports = { produceToken };
