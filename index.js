const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");

// local imports
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

// connect db
connectDB();

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/car", carRoutes);

//listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
