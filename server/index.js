const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const connectToMongoDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8000;

connectToMongoDB(process.env.MONGO_URL)
.then(() => { console.log("Connected to Database") })
.catch((error) => { 
  console.log("Error connecting to Database: ", error);
  process.exit(1);
});

app.use(express.json());

app.use(cors({
  origin: `http://localhost:${PORT}`, 
  credentials: true,
}));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});