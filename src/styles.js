// src/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 15px;
  margin-top: 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #555;
  margin: 20px 0 10px;
`;

export const ReviewSection = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const ProductItem = styled.div`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const PurchaseSection = styled.div``;

export const PurchaseItem = styled.div``;
