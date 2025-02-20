// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Database
const connectToMongoDB = require('./config/db');

// Importing Routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');

const app = express();
const PORT = process.env.PORT || 8000;

connectToMongoDB(process.env.MONGO_URL)
.then(() => { console.log("Connected to Database") })
.catch((error) => { 
  console.log("Error connecting to Database: ", error);
  process.exit(1);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});