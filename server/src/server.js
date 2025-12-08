// server/src/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const calcRoutes = require("./routes/calcRoutes");

dotenv.config(); // load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// global middleware
app.use(cors());
app.use(express.json());


app.use("/api/calc", calcRoutes);

// sample route
app.get('/', (req, res) => {
  res.json({status: "OK", message: 'Alphabetic Calculator API is running'})
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});