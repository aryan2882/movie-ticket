const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes')
//const port = 5000;

require('dotenv').config();
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());

//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));



app.use('/api/movies', movieRoutes);
app.use('/api/user', authRoutes);
const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
