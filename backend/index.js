// DEPENDENCIES
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/auth');
app.use('/api/auth', userRoutes);

const noteRoutes = require('./routes/notes');
app.use('/api/notes', noteRoutes);



app.listen(port, () => {
  console.log(`STG Note-Taker backend listening on port http://localhost:${port}`)
})
