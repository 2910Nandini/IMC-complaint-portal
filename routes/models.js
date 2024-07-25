require('dotenv').config();
const mongoose = require('mongoose');

//connection to mongodb
mongoose.connect(process.env.MONGODB_URI || 
    "mongodb+srv://nandinijoshi2016:exo-L%40ot9@cluster0.vyrr1j7.mongodb.net/employee_complaint?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => {
    console.log('Connected to MongoDB');   
}).catch((e) => {
    console.log("Connection failed", e);
}) 

//user model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    employeeID: { type: String, required: true, unique : true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User; 