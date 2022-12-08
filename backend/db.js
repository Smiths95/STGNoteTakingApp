const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://tysonlannon:rw92vrcMzwBNsXAS@cluster6977.oyy7lkw.mongodb.net/stgnotes'

const connectDb = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }, () => {
    console.log('Connected to MongoDb host!');
  });
};

module.exports = connectDb;
