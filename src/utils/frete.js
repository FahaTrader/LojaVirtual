import axios from 'axios';

const API_URL = 'https://brasilapi.com.br/api/cep/v1';
const CEP_FIXO = '24451315';  // CEP fixo para cálculo de frete
const BASE_FRETE = 7;  // Frete base
const FRETE_POR_5KM = 2;  // Valor adicional por cada 5km

// Função para calcular a distância aproximada (em km) entre dois CEPs
const calcularDistancia = (cep1, cep2) => {
  // Exemplo de cálculo de distância baseado na diferença numérica dos CEPs
  // Esse cálculo é simplificado e serve apenas como exemplo
  const distancia = Math.abs(parseInt(cep1) - parseInt(cep2)) / 1000;
  return distancia;
};

export const calcularFrete = async (cep) => {
  try {
    const response = await axios.get(`${API_URL}/${cep}`);
    if (response.data) {
      const distancia = calcularDistancia(CEP_FIXO, cep);
      const freteAdicional = Math.ceil(distancia / 5) * FRETE_POR_5KM;
      const frete = BASE_FRETE + freteAdicional;
      return frete;
    }
  } catch (error) {
    console.error('Erro ao calcular o frete:', error);
    return null;
  }
};
