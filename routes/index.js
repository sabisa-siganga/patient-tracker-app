// importing express
const express = require("express");

const router = express.Router();
// importing controllers
const { registerUser, login } = require("../controllers/authContollers");

// importing middlewares
const { handleUserEmail } = require("../middlewares/emailMiddleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// register user endpoint for general users only
router.post("/register", handleUserEmail, registerUser);

// login route
router.post("/signin", handleUserEmail, login);

module.exports = router;
