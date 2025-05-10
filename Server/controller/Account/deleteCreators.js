const Account = require('../../models/account_schema');
exports.deleteCreator = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Account.findById(id);
        if (!user || user.role !== 'Content_creator') {
            return res.status(404).json({ message: 'Content creator not found' });
        }

        await Account.findByIdAndDelete(id);
        res.status(200).json({ message: 'Content creator deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting creator', error });
    }
};
