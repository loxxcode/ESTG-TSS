const express = require('express');
const router = express.Router();


router.get('/data', (req, res) => {
  res.json({ message: 'Get all data for announcement'  });
});

router.post('/Insert_data', (req, res) => {
  res.json({ message: 'insert data for announcement' });
});

router.get('/Insert_data_by_id/:id', (req, res) => {
  res.json({ message: `Get Data with ID: ${req.params.id} for announcement` });
});

router.put('/Update_data_by_id/:id', (req, res) => {
  res.json({ message: `Update Data with ID: ${req.params.id} for announcement` });
});

router.delete('/Delete_data_by_id/:id', (req, res) => {
  res.json({ message: `Delete Data with ID: ${req.params.id} for announcement` });
});

module.exports = router; 