// importing express
const express = require("express");

// importing router
const router = express.Router();

// importing middleware
const { isUser } = require("../middlewares/secureRoutes");
const { fetchUserAppointments } = require("../controllers/appointments");

// get appointments route for user
router.get("/", isUser, fetchUserAppointments);

module.exports = router;
