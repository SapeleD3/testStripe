const charges = require('./makePayment');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/charge', async (req, res) => {
  const charge = await charges(req.body);

  return res.send(charge);
});

const host = 'localhost';
const port = 8000;
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
