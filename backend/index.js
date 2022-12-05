const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const notesRoute = require('./routes/notes-route.js');
const usersRoute = require('./routes/users-route.js');

const app = express();

const db = process.env.MONGODB_URL;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Methods', '*');
    if(req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});

app.use(cors());
app.use(express.json());


app.use('/users', usersRoute);
app.use('/notes', notesRoute);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Backend server is up and running on port ${port}!`);
});
