const mongoose = require('mongoose');
const mongoUri = 'mongodb+srv://tysonlannon:rw92vrcMzwBNsXAS@cluster6977.oyy7lkw.mongodb.net/notesapp'

const connectDb = () => {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }, () => {
    console.log('Connected to MongoDb host!');
  });
};

module.exports = connectDb;
