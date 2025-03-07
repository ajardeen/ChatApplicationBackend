const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tokenGenerator } = require("../configs/JwtTokenGenerator");

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const username = name;
    
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }
    if (username && email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);

     await User.create({
        username,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({ message: "Registered Successfully" });
    } else {
      return res.status(400).json({ message: "All Fields are required" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const decodedPassword = await bcrypt.compare(password,user.password)
    if (!decodedPassword) {
      return res.status(500).json({ message: "Password inValid" });
    }
    const token = await tokenGenerator(user._id, email,user.username);
    return res
      .status(200)
      .json({ message: "Successfully Logged IN", token: token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req,res)=>{
  try {
    const users = await User.find({}, "_id username"); // Only return _id and username
    res.json(users);
} catch (error) {
    res.status(500).json({ message: "Error fetching users" });
}
}

module.exports = { Register, Login,getAllUsers };
