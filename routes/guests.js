
const express = require('express');
const router = express.Router();
const Guest = require('../models/guest');

// Get all guests
router.get('/', async (req, res) => {
  const guests = await Guest.findAll();
  res.json(guests);
});

// Create a new guest
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const guest = await Guest.create({ name, email });
  res.json(guest);
});

module.exports = router;
