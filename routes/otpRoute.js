const express = require('express');
//const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
const OTP = require('../models/otp');

const otpGenerator = require('otp-generator');

//send users otp
router.post('/send-user-otp', async (req, res) => {
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
 
//send admins otp
router.post('/send-admin-otp', async (req, res) => {
    //fetch email from req body
    const { email } = req.body;
    //check if user already exists ?
    if (!email)
    {
      return res.status(500).json({
        success: false,
        msg: "admin does not exists",
      });
    }
    const checkAdminPresent = await Admin.findOne({ email });
    if (!checkAdminPresent) 
    {
      return res.status(200).json({
        success: false,
        msg: "Admin not found"
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

module.exports = router;
  