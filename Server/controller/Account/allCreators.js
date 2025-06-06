const Account = require('../../models/account_schema');

exports.allCreators = async (req, res) => {
  try {
    const creators = await Account.find({ role: 'Content_creator' });

    // Map over creators and convert backupCode hex to decimal
    const creatorsWithDecimalBackup = creators.map((creator) => {
      // If backupCode exists, convert hex string to decimal number
      let backupCodeDecimal = null;
      if (creator.backupCode) {
        backupCodeDecimal = parseInt(creator.backupCode, 16);
      }

      return {
        ...creator.toObject(),  // convert mongoose doc to plain object
        backupCodeDecimal
      };
    });

    res.status(200).json(creatorsWithDecimalBackup);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching creators', error });
  }
};
