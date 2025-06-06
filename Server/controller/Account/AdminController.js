const Account = require("../../models/account_schema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Admin login function
exports.adminlogin = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {
        // Add await and proper error handling for database query
        const user = await Account.findOne({ email }).select('+password').exec();
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials" // Generic message for security
            });
        }

        // Check admin role
        if (user.role !== "Admin") {
            return res.status(403).json({ // 403 Forbidden is more appropriate
                success: false,
                message: "Access denied: Admin privileges required"
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password incorrect"
            });
        }

        // Omit password in response
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        req.session.username = user.username
        req.session.email = user.email
        req.session.role = user.role
        req.session.backupCode = user.backupCode // Include backup code if needed
        req.session.Userid = user._id

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: userResponse
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error during login" 
        });
    }
};

// Generate secure backup code
function generateBackupCode() {
  return crypto.randomBytes(4).toString("hex"); // 8-character code
}

// Admin signup function with backup code generation
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
    const plainBackupCode = generateBackupCode();

    const newUser = new Account({
      username,
      email,
      password: hashedPassword,
      role: "Admin",
      backupCode: plainBackupCode  // Make sure your schema has this field
    });

    await newUser.save();

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      user: userResponse,
      backupCode: plainBackupCode  // Send backup code to client/admin securely
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration"
    });
  }
};