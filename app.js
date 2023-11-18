const express = require("express");
const { connectToDatabase } = require("./db-setup");

// Load environment variables from a .env file into the process.env object
require("dotenv").config();

const app = express();

// importing appointment routes
const appointmentRoutes = require("./routes/adminRoutes");

// importing appointment routes
const userRoutes = require("./routes/userRoutes");

const indexRouter = require("./routes/index");

// using middleware to parse JSON data
app.use(express.json());

// port
const PORT = process.env.PORT || 8080;

// initiating database connection
connectToDatabase();

// Routes
app.use("/", indexRouter);
app.use("/appointments", appointmentRoutes);
app.use("/my-appointments", userRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
