// importing bcrypt
const bcrypt = require("bcrypt");

// importing user model
const User = require("../models/user");

// Importing the produceToken utility function
const { produceToken } = require("../utilities/utilities");

// handling user registration
const registerUser = async (req, res) => {
  try {
    // getting username and password from the request body
    const { username, password } = req.body;

    // Encrypting the user's password using bcrypt
    const encrypt = await bcrypt.hash(password, 10);

    // Creating a new User instance with the provided username, encrypted password, and a default role of "general"
    const user = new User({
      username: username.trim().toLowerCase(),
      password: encrypt,
      role: "general",
    });

    // Saving the user to the database
    user
      .save()
      .then((result) => {
        // Responding with a success message if user registration is successful
        res.status(200).json({
          message: "Successfully registered the user",
        });
      })
      .catch((err) => {
        // Handling registration failure and responding with an error message
        console.error(err);
        res
          .status(400)
          .json({ message: "Failed to register the user", error: err.message });
      });
  } catch (error) {
    // Handling unexpected errors and responding with an error message
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handling login
async function login(req, res) {
  try {
    // getting username and password from the request body
    const { username, password } = req.body;

    // checking if the user contains username
    const findUser = await User.findOne({
      username: username.trim().toLowerCase(),
    });

    // if findUser does not exist, respond with an error
    if (!findUser) {
      return res.status(401).json({ error: "User is not found" });
    }

    // Comparing the provided password with the hashed password stored in the database
    if (bcrypt.compare(password, findUser.password)) {
      // Generating a JWT token for the authenticated user

      const jwtToken = produceToken(findUser._id, findUser.role);
      // Responding with a success status (200) along with the user's role, username, and the generated JWT token
      res.status(200).json({
        user: {
          role: findUser.role,
          username: findUser.username,
        },
        token: jwtToken,
      });
    } else {
      // Responding with an error status (400) when the password is incorrect
      res.status(400).json({ error: "Incorrect password" });
    }
  } catch (error) {
    // Handling unexpected errors and responding with an error message
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  registerUser,
  login,
};
