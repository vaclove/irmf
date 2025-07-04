
const express = require('express');
const router = express.Router();
const Edition = require('../models/edition');

// Get all editions
router.get('/', async (req, res) => {
  const editions = await Edition.findAll();
  res.json(editions);
});

// Create a new edition
router.post('/', async (req, res) => {
  const { year } = req.body;
  const edition = await Edition.create({ year });
  res.json(edition);
});

module.exports = router;
