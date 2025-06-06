const Account = require("../../models/account_schema");
const bcrypt = require("bcrypt");

// Helper: Generate 4-digit backup code, store hex, return decimal
function generateBackupCode() {
  const decimalCode = Math.floor(1000 + Math.random() * 9000); // e.g. 4273
  const hexCode = decimalCode.toString(16).toUpperCase(); // e.g. "10B1"
  return { decimal: decimalCode, hex: hexCode };
}

// ==== Content Creator Signup ====
exports.creatorsignup = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: "Email and username are required"
      });
    }

    const existingUser = await Account.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // Generate a temporary password or handle password creation elsewhere
    const tempPassword = "estg@gmail.com"; // You can adjust this or get from req.body
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Generate backup code (decimal + hex)
    const { decimal: plainBackupCode, hex: hexBackupCode } = generateBackupCode();

    const newUser = new Account({
      username,
      email,
      password: hashedPassword,
      role: "Content_creator",
      backupCode: hexBackupCode // Store hexadecimal code in DB
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Content creator registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      backupCode: plainBackupCode // Send decimal backup code to user
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration"
    });
  }
};

// ==== Content Creator Login ====
exports.creatorlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Include backupCode in selection if needed
    const user = await Account.findOne({ email }).select('+password +backupCode').exec();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (user.role !== "Content_creator") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Content creator privileges required"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password incorrect"
      });
    }

    // Store user session info including backupCode converted to decimal
    req.session.username = user.username;
    req.session.email = user.email;
    req.session.role = user.role;
    req.session.Userid = user._id;
    req.session.backupCode = parseInt(user.backupCode, 16); // Convert hex back to decimal

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      backupCode: parseInt(user.backupCode, 16) // optionally send decimal backup code here too
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login"
    });
  }
};
