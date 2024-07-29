const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    employeeID: { type: String, required: true, unique : true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//user model
const User = mongoose.model('User', userSchema);

module.exports = User;