// DEPENDENCIES
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3000;


connectDB();
app.use(cors());
app.use(express.json());


app.use('/api/notes', noteRoutes);
app.use('/api/auth', userRoutes);


app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`.blue)
})
