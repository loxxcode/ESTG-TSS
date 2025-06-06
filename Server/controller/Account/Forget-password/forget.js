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

    // Find the user and include hashed backupCode
    const user = await Account.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

if (user.backupCode !== backupCode) {
    console.log("Backup code is valid:", user.backupCode);
  return res.status(400).json({
    success: false,
    message: `Invalid backup code: ${backupCode}`
  });
}
    // Set a temporary default password (user should change it after login)
    const tempPassword = "estg@gmail.com";
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
