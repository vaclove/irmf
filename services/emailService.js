

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

const sendInvitationEmail = (guest, edition) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: guest.email,
    subject: `Invitation to ${edition.year} Film Festival`,
    text: `Dear ${guest.name},\n\nYou are invited to the ${edition.year} Film Festival. Please confirm your attendance by clicking the following link: http://localhost:3000/invitations/confirm/${guest.id}/${edition.id}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendInvitationEmail };

