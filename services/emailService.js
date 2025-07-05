const axios = require('axios');

const sendInvitationEmail = async (guest, edition) => {
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const senderEmail = process.env.MAILGUN_SENDER_EMAIL;

  if (!mailgunDomain || !mailgunApiKey || !senderEmail) {
    console.error("Mailgun environment variables are not set.");
    return;
  }

  const data = new URLSearchParams();
  data.append('from', `IRMF <${senderEmail}>`);
  data.append('to', guest.email);
  data.append('subject', `Invitation to ${edition.year} Film Festival`);
  const publicHostname = process.env.PUBLIC_HOSTNAME || 'http://localhost:3000';
  data.append('text', `Dear ${guest.name},\n\nYou are invited to the ${edition.year} Film Festival. Please confirm your attendance by clicking the following link: ${publicHostname}/invitations/confirm/${guest.id}/${edition.id}`);

  try {
    const response = await axios.post(
      `https://api.eu.mailgun.net/v3/${mailgunDomain}/messages`,
      data,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`api:${mailgunApiKey}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    console.log('Email sent: ', response.data);
  } catch (error) {
    console.error('Error sending email: ', error.response ? error.response.data : error.message);
  }
};

module.exports = { sendInvitationEmail };