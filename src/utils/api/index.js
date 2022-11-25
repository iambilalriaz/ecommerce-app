import axios from 'axios';
import { PRODUCTS_API_URL } from '../../constants';

export const getAllProducts = () =>
  axios.request({
    url: PRODUCTS_API_URL,
    method: 'GET',
  });
export const getProduct = (prodId) =>
  axios.request({
    url: `${PRODUCTS_API_URL}/${prodId}`,
    method: 'GET',
  });
export const addProduct = (prodData) =>
  axios.request({
    url: `${PRODUCTS_API_URL}`,
    method: 'POST',
    data: JSON.stringify(prodData),
    headers: { 'Content-Type': 'application/json' },
  });
export const updateProduct = (prodId, prodData) =>
  axios.request({
    url: `${PRODUCTS_API_URL}/${prodId}`,
    method: 'PATCH',
    data: JSON.stringify(prodData),
    headers: { 'Content-Type': 'application/json' },
  });
export const deleteProduct = (prodId) =>
  axios.request({
    url: `${PRODUCTS_API_URL}/${prodId}`,
    method: 'DELETE',
  });
