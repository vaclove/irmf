
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
  const { name, surname, email, phone, company, note, language } = req.body;
  const guest = await Guest.create({ name, surname, email, phone, company, note, language });
  res.json(guest);
});

module.exports = router;
