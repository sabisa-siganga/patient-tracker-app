// Import the produceToken utility function

const Appointment = require("../models/appointments");

// initializing appointments variable to store appointments
const appointments = {};

// Adding an appointment
async function addAppointment(req, res) {
  try {
    // getting username from the req
    const consultant = req.user.username;

    // destructuring  name, consultant and dateTime
    const { name, username, dateTime } = req.body;

    const appointment = new Appointment({
      name,
      username,
      dateTime,
      consultant,
      status: "Active",
    });

    // Responding with a 200 status and return the added item
    appointment
      .save()
      .then((result) => {
        res.status(200).json({
          appointment: {
            _id: result._id,
            name: result.name,
            username: result.username,
            dateTime: result.dateTime,
            consultant: result.consultant,
            status: result.status,
          },
          message: "Appointment added successfully",
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: "Failed to add an appointment" });
      });
  } catch (error) {
    console.error(error);
    // error handling
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// getting all appointments
async function fetchAppointments(req, res) {
  try {
    const appointments = await Appointment.find().select("-__v").lean();

    // Responding with a 200 status and return the appointments
    res.status(200).json({ appointments });
  } catch (error) {
    console.log(error);

    // error handling
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// getting all user appointments
async function fetchUserAppointments(req, res) {
  try {
    // getting username from the user request
    const { username } = req.user;

    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // getting appointments using the username and dateTime
    const appointments = await Appointment.find({
      username,
      dateTime: { $gte: thirtyDaysAgo }, // Filter appointments within the last 30 days
    })

      // ommitting the _v property
      .select("-__v")
      .lean();

    // Responding with a 200 status and return the appointments
    res.status(200).json({ appointments });
  } catch (error) {
    console.log(error);

    // error handling
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// updating the appointment
async function editAppointment(req, res) {
  try {
    // getting the id from the request params
    const id = req.params.id;

    // getting the updated name, consultant and dateTime from the request body
    const { name, consultant, dateTime } = req.body;

    // Using findByIdAndUpdate to update the appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { name, consultant, dateTime },
      { new: true, runValidators: true }
    );

    // checking if the updated appointment exists, if not, respond with an error message
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // ommitting the _v property from the appointments
    const appointments = await Appointment.find().select("-__v").lean();

    // Responding with a 200 status and return the list of appointments
    res.status(201).json({
      message: "Appointment successfully updated",
      appointments,
    });
  } catch (error) {
    console.log(error);
    // error handling
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Cancelling the appointment
async function cancelAppointment(req, res) {
  try {
    // getting the id from the request params
    const id = req.params.id;

    // Using findByIdAndUpdate to update the appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true, runValidators: true }
    );

    // checking if the updated appointment exists, if not, respond with an error message
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    //  ommitting the _v property from the appointments
    const appointments = await Appointment.find().select("-__v").lean();

    // Responding with a 200 status and return the list of appointments
    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointments,
    });
  } catch (error) {
    console.log(error);
    // error handling
    res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = {
  addAppointment,
  fetchAppointments,
  editAppointment,
  cancelAppointment,
  fetchUserAppointments,
};
