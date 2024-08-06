const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
const OTP = require('../models/otp');
const Complaint = require('../models/complaint');

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
            return res.status(400).json({ message: 'Admin does not exist' });
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
});

router.post('/newcomplaint', async (req, res) => {
    const { employeeName, employeeCode, complaintTitle, department, email, complaintDate, complaintDetails, complaintAttachment } = req.body;

    try {
        const attachmentString = typeof complaintAttachment === 'object' ? JSON.stringify(complaintAttachment) : complaintAttachment;
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.username === employeeName && existingUser.employeeID === employeeCode) {
            await Complaint.create({ 
                employeeName, 
                employeeCode, 
                complaintTitle, 
                department, 
                email, 
                complaintDate, 
                complaintDetails, 
                complaintAttachment: attachmentString
            });
            res.status(200).json({ message: 'Complaint submitted successfully' });
        } else {
            res.status(400).json({ message: 'User does not exist or credentials do not match' });
        }
    } catch (error) {
        console.error('Error submitting complaint:', error);
        res.status(500).json({ message: 'Error submitting complaint' });
    }
});

// Route to render the alluser page
router.get('/alluser', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('alluser', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

// Route to render the alluser page
router.get('/totalcomplaints', async (req, res) => {
    try {
        const complaints = await Complaint.find({});
        res.render('totalcomplaints', { complaints });
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).send('Error fetching complaints');
    }
});

// Route to render the totaladmin page
router.get('/totaladmin', async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.render('totaladmin', { admins });
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).send('Error fetching admins');
    }
});


module.exports = router;
