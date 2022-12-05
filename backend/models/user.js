const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Note = require('./note.js')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [
        { token: {
            type: String,
            required: true
        }}
    ]
},
    {
        timestamps: true 
    }
);


userSchema.virtual('notes', {
    ref: 'Note',
    localField: '_id',
    foreignField: 'owner'
});


userSchema.methods.toJSON = () => {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};


userSchema.methods.generateAuthToken = async () => {
    const user = this;
    const token = jwt.sign(
        { _id: user.id.toString() },
        process.env.JWT_SECRET
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};


userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if(!user) {
        throw new Error('Unable to log in!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Unable to log in!');
    }
    return user;
}


userSchema.pre('save', async (next) => {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});


userSchema.pre('remove', async (next) => {
    const user = this;
    await Note.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;