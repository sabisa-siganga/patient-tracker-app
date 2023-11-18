// Middleware to handle appointments
const checkAppointment = async (req, res, next) => {
  try {
    // destructuring  name, username and dateTime
    const { name, username, dateTime } = req.body;

    // checking if name, username and dateTime exist, if not, respond with na error
    if (!name || !username || !dateTime) {
      return res.status(400).json({
        error: "Missing required fields: name, username and dateTime",
      });
    }

    // continue to the next controller
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkAppointment };
