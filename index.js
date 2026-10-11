const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Essential to parse JSON sent from client fetch()

// Connect to MongoDB Database
const atlastURI = "mongodb+srv://it24jayparab_db_user:nUTCkgB8xJthMvWV@cluster0.huztyor.mongodb.net/?appName=Cluster0"
mongoose.connect(atlastURI)
  .then(() => console.log('Successfully connected to MongoDB Atlast Cloud database.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// MongoDB Schema matching your form input attributes exactly
const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// POST Endpoint: Save student submission to database
app.post('/api/students', async (req, res) => {
  try {
    const { fullName, dob, gender, course } = req.body;

    // Server-side field check
    if (!fullName || !dob || !gender || !course) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const newStudent = new Student({ fullName, dob, gender, course });
    await newStudent.save();

    res.status(201).json({
      success: true,
      message: `Student ${fullName} saved to MongoDB successfully!`
    });
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET Endpoint: Fetch all stored students (For display component/UI)
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve students' });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});