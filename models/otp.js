const mongoose = require('mongoose');
const mailSender = require("../utils/mailSender");

//otp model
const OTPSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300
    },
    expireAt: { 
      type: Date, 
      default: Date.now,
      expires: 300
    }
});

OTPSchema.pre("save", async function (next) {
    try {
      //only send email when a new Document is created
      if (this.isNew) {
        const mailResponse = await mailSender(
          this.email,
          "Verification Email",
          this.otp,
        );
        console.log("Verification Mail Sent :" + mailResponse.response);
      }
      const now = new Date();
      this.expireAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
      next();
    } catch (error) {
      console.error("Error occurred while sending email", error);
    }
});

OTPSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const OTP = mongoose.model('OTP', OTPSchema);
  
module.exports = OTP;
  