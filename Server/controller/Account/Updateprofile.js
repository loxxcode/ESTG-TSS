const Account = require("../../models/account_schema");
const bcrypt = require("bcrypt");

exports.update = async (req, res) => {
  const Userid = req.session.Userid;
  if (!Userid) {
    return res.status(403).json({ success: false, message: "User id is required" });
  }

  try {
    const { username, email, password } = req.body;
    const updateFields = {};

    if (username) updateFields.username = username;
    if (email) updateFields.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await Account.findByIdAndUpdate(Userid, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Internal server error during profile update" });
  }
};
