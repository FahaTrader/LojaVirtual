import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initMercadoPago, CardNumber, ExpirationDate, SecurityCode, createCardToken } from '@mercadopago/sdk-react';

initMercadoPago('https://api.mercadopago.com/oauth/token');

function CheckoutPage({
  cartTotal
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    securityCode: '',
    docType: '',
    docNumber: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const cardTokenData = {
      cardNumber: formData.cardNumber,
      cardExpirationMonth: formData.cardExpirationMonth,
      cardExpirationYear: formData.cardExpirationYear,
      securityCode: formData.securityCode,
      cardholderName: formData.name,
      identificationType: formData.docType,
      identificationNumber: formData.docNumber,
    };

    try {
      const tokenResponse = await createCardToken(cardTokenData);
      if (tokenResponse.status === 200) {
        const token = tokenResponse.body.id;

        const paymentData = {
          token: token,
          transactionAmount: cartTotal,
          description: 'Purchase Description',
          installments: 1,  // Número de parcelas
          paymentMethodId: 'visa',  // Altere conforme necessário
          payer: {
            email: formData.email,
            docType: formData.docType,
            docNumber: formData.docNumber
          }
        };

        const response = await fetch('http://localhost:3000/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentData)
        });

        const data = await response.json();

        if (data.status === 'approved') {
          navigate('/confirmation');
        } else {
          alert('Failed to process payment');
        }
      } else {
        alert('Failed to create card token');
      }
    } catch (error) {
      console.error('Error creating card token:', error);
      alert('Failed to create card token');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        
        <h2>Payment Information</h2>
        <div>
          <label>Card Number:</label>
          <CardNumber
            id="form-checkout__cardNumber"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Expiration Date:</label>
          <ExpirationDate
            id="form-checkout__expirationDate"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Security Code:</label>
          <SecurityCode
            id="form-checkout__securityCode"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Document Type:</label>
          <input type="text" name="docType" value={formData.docType} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Document Number:</label>
          <input type="text" name="docNumber" value={formData.docNumber} onChange={handleInputChange} required />
        </div>

        <button type="submit">Confirm Purchase</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
