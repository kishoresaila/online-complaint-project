
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5002;


// Import Mongoose models


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes

// 🟢 Sign Up
app.post("/SignUp", async (req, res) => {
  console.log("✅ Backend /SignUp route HIT"); 
  const { name, email, password, role, phone } = req.body;

  console.log("Received SignUp Data:", req.body);

  try {
    if (!name || !email || !password || !role || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const newUser = new User({ name, email, password, role, phone });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// 🟢 Login
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.json({ user });
});
//complaint
const { User, Complaint } = require("./Schema");
 // import Complaint model

app.post("/Complaint", async (req, res) => {
  console.log("📥 Received complaint:", req.body);

  try {
    const { userId, name, address, city, state, pincode, status, comment } = req.body;

    if (!userId || !name || !address || !city || !state || !pincode || !status || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newComplaint = new Complaint({ userId, name, address, city, state, pincode, status, comment });
    await newComplaint.save();

    console.log("✅ Complaint saved");
    res.status(201).json({ message: "Complaint registered successfully" });
  } catch (error) {
    console.error("❌ Complaint submission error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
app.get("/agentUsers", async (req, res) => {
  try {
    const agents = await User.find({ role: "Agent" });
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching agents" });
  }
});
app.get("/ordinaryUsers", async (req, res) => {
  try {
    const users = await User.find({ role: "User" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.get("/AllComplaints", async (req, res) => {
  try {
    const complaints = await Complaint.find(); // import model!
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error: error.message });
  }
});


// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
