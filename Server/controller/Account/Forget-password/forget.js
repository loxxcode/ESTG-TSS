const Account = require("../../../models/account_schema");
const bcrypt = require("bcrypt");

exports.forgotPasswordWithBackupCode = async (req, res) => {
  try {
    const { email, backupCode } = req.body;

    if (!email || !backupCode) {
      return res.status(400).json({
        success: false,
        message: "Email and backup code are required"
      });
    }

    // Find the user and include backupCode field
    const user = await Account.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Convert user input decimal backupCode (string or number) to hex uppercase string
    const inputBackupCodeHex = parseInt(backupCode, 10).toString(16).toUpperCase();

    // Compare with stored hex backupCode
    if (user.backupCode !== inputBackupCodeHex) {
      console.log("Backup code invalid:", inputBackupCodeHex, "stored:", user.backupCode);
      return res.status(400).json({
        success: false,
        message: "Invalid backup code"
      });
    }

    // If backup code matches, reset password to temp password
    const tempPassword = "estg@gmail.com"; // Or generate a random temporary password here
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);
    user.password = hashedTempPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. Use the temporary password to log in.",
      tempPassword // Send temp password only once (optional)
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
