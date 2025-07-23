const mongoose = require("mongoose");

// 🔹 User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 4 },
  phone: { type: String, default: "" },
  role: { type: String, enum: ["Admin", "User", "Agent"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

// 🔹 Complaint schema
const complaintSchema = new mongoose.Schema({
  userId: String,
  name: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  status: String,
  comment: String,
}, { timestamps: true });

const Complaint = mongoose.model("Complaint", complaintSchema);

// ✅ Export both
module.exports = { User, Complaint };



