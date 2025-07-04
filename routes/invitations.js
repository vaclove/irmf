
const express = require('express');
const router = express.Router();
const Invitation = require('../models/invitation');
const Guest = require('../models/guest');
const Edition = require('../models/edition');
const { sendInvitationEmail } = require('../services/emailService');

// Assign a guest to an edition and send invitation
router.post('/assign', async (req, res) => {
  const { guestId, editionId, category } = req.body;
  const guest = await Guest.findByPk(guestId);
  const edition = await Edition.findByPk(editionId);
  if (guest && edition) {
    await edition.addGuest(guest, { through: { category } });
    sendInvitationEmail(guest, edition);
    res.json({ message: 'Invitation sent successfully' });
  } else {
    res.status(404).json({ message: 'Guest or Edition not found' });
  }
});

// Confirm an invitation
router.get('/confirm/:guestId/:editionId', async (req, res) => {
  const { guestId, editionId } = req.params;
  const invitation = await Invitation.findOne({ where: { GuestId: guestId, EditionId: editionId } });
  if (invitation) {
    invitation.status = 'confirmed';
    await invitation.save();
    res.send('Thank you for confirming your attendance!');
  } else {
    res.status(404).send('Invitation not found');
  }
});

module.exports = router;
