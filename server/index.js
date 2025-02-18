const express = require('express');
const mongoose = require('mongoose');
const connectToMongoDB = require('./config/db');

const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/postings')
.then(() => { console.log("Connected to Database") })
.catch((error) => { console.log("Error: ", error) })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});