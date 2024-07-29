// app.js
const express = require('express');
const path = require('path');
const app = express();
//const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//connection to mongodb
mongoose.connect(process.env.MONGODB_URI || 
    "mongodb+srv://nandinijoshi2016:exo-L%40ot9@cluster0.vyrr1j7.mongodb.net/employee_complaint?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => {
    console.log('Connected to MongoDB');   
}).catch((e) => {
    console.log("Connection failed", e);
}) 

// Define routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;