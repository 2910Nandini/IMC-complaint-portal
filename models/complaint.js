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
        //enum: ['IT', 'HR', 'Finance', 'Operations', 'Admin']
    },
    email: {
        type: String,
        required: true
    },
    complaintDate: {
        type: Date,
        required: true,
        //default: Date.now
    },
    complaintDetails: {
        type: String,
        required: true
    },
    complaintAttachment: {
        type: String, // Assuming the file path or URL will be stored here
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

complaintSchema.pre('save', function(next) {
    // Example condition to change status from Pending to In Progress
    if (this.isModified('status') && this.status === 'Pending') {
        this.status = 'In Progress';
    }

    // Example condition to change status from In Progress to Completed
    if (this.isModified('status') && this.status === 'In Progress') {
        this.status = 'Completed';
    }
    next();
});


const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
