const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the User model

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// Signup Controller
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
   
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email is in a valid format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance without the profile picture
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Generate JWT Token
    const token = jwt.sign(
      { userId: savedUser._id, username: savedUser.username, isAdmin: savedUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send the response back to the client with the user data and token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
      token, // Send the JWT token to the client
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send the response back to the client with the user data and token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token, // Send the JWT token to the client
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };
