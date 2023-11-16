const express = require("express");
const app = express();

// using middleware to parse JSON data
app.use(express.json());
