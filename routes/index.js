const express = require('express');
//const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
//const app = express();
const router = express.Router();
const User = require('./models');


router.get('/', (req, res) => {
    res.render('userlogin');  // userlogin.ejs
});

router.post('/register', async (req, res) => {
    const { username, employeeID, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);


  await User.create({ username, employeeID, email, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
  //res.redirect('/index');  // Redirect to home page or another page after processing
});

module.exports = router;
