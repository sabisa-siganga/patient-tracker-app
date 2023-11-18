// importing json web token
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// verify if the user is an admin
const isAdmin = async (req, res, next) => {
  let token = "";

  try {
    // get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if no token is provided in the headers, indicating unauthorized access
    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    // Checking if the request's content type is JSON
    if (req.get("Content-Type") !== "application/json") {
      return res
        .status(403)
        .json({ error: "Only JSON content type is allowed." });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // checking the user's role
    if (decoded.role !== "admin") {
      return res.status(403).json({
        error: "Access denied, not an admin",
      });
    }

    // get user via user id
    const user = await User.findOne({
      _id: decoded.userId,
    });

    if (!user) {
      return res.status(403).json({
        error: "User not found",
      });
    }

    req.user = user;

    // Continue to the next controller
    next();
  } catch (err) {
    // error handling
    console.log(err);
    res.status(401).json({ error: "Not authorized" });
  }
};

// verify if the user is the general user
const isUser = async (req, res, next) => {
  let token = "";

  try {
    // get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if the token is missing
    if (!token) {
      return res
        .status(401)
        .json({ error: "Not authorized: no token provided" });
    }

    // Checking if the request's content type is JSON
    if (req.get("Content-Type") !== "application/json") {
      return res
        .status(403)
        .json({ error: "Only JSON content type is allowed." });
    }

    // Verify the token using the SECRET_KEY from environment variables
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // checking the user's role
    if (decoded.role !== "general") {
      return res.status(403).json({
        error: "Access denied, not permitted",
      });
    }

    // get user via user id
    const user = await User.findOne({
      _id: decoded.userId,
    });

    // checking if the user exists, if nit, respond with an error message
    if (!user) {
      return res.status(403).json({
        error: "User not found",
      });
    }

    req.user = user;

    // Continue to the next controller, as the user is authorized
    next();
  } catch (err) {
    // handling error
    console.log(err);
    res.status(401).json({ error: "Not authorized" });
  }
};

module.exports = { isAdmin, isUser };
