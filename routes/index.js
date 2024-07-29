const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
const OTP = require('../models/otp');
const Complaint = require('../models/user');

const otpGenerator = require('otp-generator');

router.get('/', (req, res) => {
    res.render('homepage');             //rendering home page
});

router.get('/userlogin', (req, res) => {
    res.render('userlogin');  
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard'); 
});

router.get('/filecomplaint', (req, res) => {
    res.render('filecomplaint'); 
});

router.get('/mycomplaint', (req, res) => {
    res.render('mycomplaint'); 
});

router.get('/admindash', (req, res) => {
    res.render('admindash'); 
});

router.get('/totalcomplaints', (req, res) => {
    res.render('totalcomplaints'); 
});

router.get('/alluser', (req, res) => {
    res.render('alluser'); 
});

router.get('/totaladmin', (req, res) => {
    res.render('totaladmin'); 
});

router.post('/loginuser', async (req, res) => {
    const { username, employeeID, email, password, otp } = req.body;
  
    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Check OTP
        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({ message: 'OTP not found' });
        }

        // Validate OTP
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check if OTP is expired
        const currentTime = new Date();
        if (currentTime > otpRecord.expireAt) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/loginadmin', async (req, res) => {
    const { username, employeeID, email, password, otp } = req.body;
  
    try {
        // Check if user exists
        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, existingAdmin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Check OTP
        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({ message: 'OTP not found' });
        }

        // Validate OTP
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check if OTP is expired
        const currentTime = new Date();
        if (currentTime > otpRecord.expireAt) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        res.status(200).json({ message: 'Admin logged in successfully' });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//send otp
router.post('/send-otp', async (req, res) => {
    //fetch email from req body
    const { email } = req.body;
    //check if user already exists ?
    if (!email)
    {
      return res.status(500).json({
        success: false,
        msg: "user does not exists",
      });
    }
    const checkUserPresent = await User.findOne({ email });
    if (!checkUserPresent) 
    {
      return res.status(200).json({
        success: false,
        msg: "User not found"
      });
    }
    //generate Otp
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const expireAt = new Date(Date.now() + 5 * 60 * 1000); // Current time + 5 minutes
  
    //save otp in db
    await OTP.create({ email, otp, expireAt });
    console.log("Otp sent successfully");
    return res.status(200).json({
      success: true,
      msg: "otp sent successfully",
      otp,
    });
});
  

router.post('/register', async (req, res) => {
    const { username, employeeID, email, password } = req.body;

  // Check if user exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);


  await Admin.create({ username, employeeID, email, password: hashedPassword });

  res.status(201).json({ message: "Admin registered successfully" });
});

router.post('/newcomplaint', async (req, res) => {
    const {employeeName, employeeCode, complaintTitle, department, email, complaintDate, complaintDetails, complaintAttachment } = req.body;

  await Complaint.create({employeeName, employeeCode, complaintTitle, department, email, complaintDate, complaintDetails, complaintAttachment });

  res.status(201).json({ message: "Complaint filed successfully" });
});


module.exports = router;
