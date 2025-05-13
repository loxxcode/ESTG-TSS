const Account = require('../../models/account_schema');
exports.allCreators = async (req, res) => {
    try {
        const creators = await Account.find({ role: 'Content_creator' });
        res.status(200).json(creators);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching creators', error });
    }
};