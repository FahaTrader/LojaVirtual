const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do Mercado Pago
mercadopago.configure({
  access_token: 'https://link.mercadopago.com.br/rafaeltrader'
});

// Rota para processar o pagamento
app.post('/process_payment', (req, res) => {
  const { token, transactionAmount, description, installments, paymentMethodId, payer } = req.body;

  const payment_data = {
    transaction_amount: Number(transactionAmount),
    token: token,
    description: description,
    installments: Number(installments),
    payment_method_id: paymentMethodId,
    payer: {
      email: payer.email,
      identification: {
        type: payer.docType,
        number: payer.docNumber
      }
    }
  };

  mercadopago.payment.save(payment_data)
    .then(function (response) {
      res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id
      });
    })
    .catch(function (error) {
      res.status(error.status || 500).send(error);
    });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
