require('dotenv').config();
const charges = require('./makePayment');
const userExport = require('./export-users');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/charge', async (req, res) => {
  const charge = await charges(req.body);

  return res.send(charge);
});

app.use('/export', async (req, res) => {
  const user = await userExport(req.body);

  return res.send({ data: user });
});

const host = 'localhost';
const port = 8000;
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
