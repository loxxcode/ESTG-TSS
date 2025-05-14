const Account = require("../../models/account_schema");
const bcrypt = require("bcrypt");

// Admin signup function
exports.creatorsignup = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        // Validate input
        if (!email || !password || !username || !phone) {
            return res.status(400).json({
                success: false,
                message: "Email, password, phone number, and username are required"
            });
        }

        // Check for existing user
        const existingUser = await Account.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin user
        const newUser = new Account({
            username,
            email,
            password: hashedPassword,
            role: "Content_creator",
            phone
        });

        await newUser.save();

        // Omit password in response
        const userResponse = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            phone
        };

        return res.status(201).json({
            success: true,
            message: "Content creator registered successfully",
            user: userResponse
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during registration"
        });
    }
};

// Admin login function
exports.creatorlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await Account.findOne({ email }).select('+password').exec();

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Check admin role
        if (user.role !== "Content_creator") {
            return res.status(403).json({
                success: false,
                message: "Access denied: Content creator privileges required"
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

        req.session.username = user.username;
        req.session.email = user.email;
        req.session.role = user.role;
        req.session.Userid = user._id;

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
