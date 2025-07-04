
require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');
const guestsRouter = require('./routes/guests');
const editionsRouter = require('./routes/editions');
const invitationsRouter = require('./routes/invitations');

const app = express();
app.use(express.json());

app.use('/guests', guestsRouter);
app.use('/editions', editionsRouter);
app.use('/invitations', invitationsRouter);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
