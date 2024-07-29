// complaint.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    employeeCode: {
        type: String,
        required: true
    },
    complaintTitle: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ['IT', 'HR', 'Finance', 'Operations', 'Admin']
    },
    email: {
        type: String,
        required: true
    },
    complaintDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    complaintDetails: {
        type: String,
        required: true
    },
    complaintAttachment: {
        type: String, // Assuming the file path or URL will be stored here
        required: true
    }
}, {
    timestamps: true
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
