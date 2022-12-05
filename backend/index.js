const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const usersRouter = require('./routes/users.route');
const notesRouter = require('./routes/notes.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbURL =  "mongodb://localhost:27017";

mongoose
    .connect(process.env.MONGODB_URI ||dbURL,{ useUnifiedTopology:true, useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
    
mongoose.set('useCreateIndex', true);

app.use('/users',usersRouter);
app.use('/notes',notesRouter);

if(process.env.NODE_ENV === 'production') {
   
    app.use(express.static(path.join(__dirname, "client", "build")))

    app.get('*',(req, res) => {
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
});