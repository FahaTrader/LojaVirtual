import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PurchaseHistoryPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      const userId = localStorage.getItem('userId'); // Assumindo que o userId está salvo no localStorage após o login
      try {
        const response = await axios.get(`http://localhost:5000/purchase-history/${userId}`);
        setPurchases(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao buscar histórico de compras');
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="purchase-history-page">
      <h2>Histórico de Compras</h2>
      {purchases.length === 0 ? (
        <p>Nenhuma compra encontrada.</p>
      ) : (
        <ul>
          {purchases.map((purchase) => (
            <li key={purchase.id}>
              <p>Produto: {purchase.product_name}</p>
              <p>Quantidade: {purchase.quantity}</p>
              <p>Preço: {purchase.price}</p>
              <p>Data da Compra: {new Date(purchase.purchase_date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PurchaseHistoryPage;
