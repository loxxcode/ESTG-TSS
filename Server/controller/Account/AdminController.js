const Account = require("../../models/account_schema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Helper: Generate 4-digit backup code, store hex, return decimal
function generateBackupCode() {
  const decimalCode = Math.floor(1000 + Math.random() * 9000); // e.g. 4273
  const hexCode = decimalCode.toString(16).toUpperCase(); // e.g. "10B1"
  return { decimal: decimalCode, hex: hexCode };
}

// Admin Signup
exports.adminsignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "Email, password and username are required"
      });
    }

    const userExists = await Account.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { decimal: plainBackupCode, hex: hexBackupCode } = generateBackupCode();

    const newUser = new Account({
      username,
      email,
      password: hashedPassword,
      role: "Admin",
      backupCode: hexBackupCode // Store hexadecimal in DB
    });

    await newUser.save();

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    };

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      user: userResponse,
      backupCode: plainBackupCode // Send decimal to admin
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration"
    });
  }
};

// Admin Login
exports.adminlogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  try {
    const user = await Account.findOne({ email }).select('+password').exec();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin privileges required"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password incorrect"
      });
    }

    req.session.username = user.username;
    req.session.email = user.email;
    req.session.role = user.role;
    req.session.Userid = user._id;
    req.session.backupCode = parseInt(user.backupCode, 16)

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse
      // Optionally return decoded backup code like this:
      // backupCode: parseInt(user.backupCode, 16)
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login"
    });
  }
};
