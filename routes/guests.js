
const express = require('express');
const router = express.Router();
const Guest = require('../models/guest');
const Invitation = require('../models/invitation');
const Edition = require('../models/edition');

// Get all guests
router.get('/', async (req, res) => {
  const guests = await Guest.findAll({
    include: [{
      model: Edition,
      as: 'Editions',
      through: {
        model: Invitation,
        as: 'Invitation',
        attributes: ['status', 'category', 'createdAt'] // Include createdAt to sort later
      },
      attributes: ['year']
    }]
  });

  const formattedGuests = guests.map(guest => {
    const guestData = guest.toJSON();
    if (guestData.Editions && guestData.Editions.length > 0) {
      // Sort invitations by createdAt to find the latest one
      guestData.Editions.sort((a, b) => new Date(b.Invitation.createdAt) - new Date(a.Invitation.createdAt));
      const lastInvitation = guestData.Editions[0].Invitation;
      const lastEdition = guestData.Editions[0];
      guestData.lastInvitation = {
        year: lastEdition.year,
        status: lastInvitation.status,
        category: lastInvitation.category
      };
    }
    delete guestData.Editions; // Remove the raw Editions array
    return guestData;
  });

  res.json(formattedGuests);
});

// Create a new guest
router.post('/', async (req, res) => {
  const { name, surname, email, phone, company, note, language } = req.body;
  const guest = await Guest.create({ name, surname, email, phone, company, note, language });
  res.json(guest);
});

module.exports = router;
