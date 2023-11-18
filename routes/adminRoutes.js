// importing express
const express = require("express");

// importing router
const router = express.Router();

// importing controllers
const {
  addAppointment,
  editAppointment,
  cancelAppointment,
  fetchAppointments,
} = require("../controllers/appointments");

// importing middlewares
const { isAdmin } = require("../middlewares/secureRoutes");
const { checkAppointment } = require("../middlewares/appointmentMiddleware");

// routes for admin
router.post("/", isAdmin, checkAppointment, addAppointment); //add appointment
router.get("/", isAdmin, fetchAppointments); // get appointments
router.put("/:id", isAdmin, checkAppointment, editAppointment); // update appointment
router.put("/cancel/:id", isAdmin, cancelAppointment); //cancel appointment

module.exports = router;
