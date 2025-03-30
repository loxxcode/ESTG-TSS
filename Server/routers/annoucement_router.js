const express = require('express');
const router = express.Router();


router.get('/data', (req, res) => {
  res.json({ message: 'Get all data' });
});

router.post('/Insert_data', (req, res) => {
  res.json({ message: 'insert by using id' });
});

router.get('/Insert_data/:id', (req, res) => {
  res.json({ message: `Get Data with ID: ${req.params.id}` });
});

module.exports = router; 