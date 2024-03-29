const mongoose = require('mongoose');
require('dotenv').config()

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Connected to MongoDb host!");
      }
    );
};

module.exports = connectDb;
// hey, I'm a comment