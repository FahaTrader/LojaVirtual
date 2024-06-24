const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');

const app = express();
const PORT = 3001;

mercadopago.configure({
  access_token: 'YOUR_ACCESS_TOKEN',
});

app.use(cors());
app.use(bodyParser.json());

app.post('/create_preference', async (req, res) => {
  const { items } = req.body;

  let preference = {
    items,
    back_urls: {
      success: 'http://localhost:3000/success',
      failure: 'http://localhost:3000/failure',
      pending: 'http://localhost:3000/pending',
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({
      id: response.body.id,
    });
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).send('Error creating preference');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
