import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Change this if your backend is running on a different port

export const getAllProTitles = async () => {
  const response = await axios.get(`${API_URL}/pro_titles`);
  return response.data;
};

export const getProTitleById = async (id) => {
  const response = await axios.get(`${API_URL}/pro_titles/${id}`);
  return response.data;
};

export const addProTitle = async (newProTitle) => {
  const response = await axios.post(`${API_URL}/pro_titles`, newProTitle);
  return response.data;
};

export const updateProTitle = async (id, updatedProTitle) => {
  const response = await axios.put(`${API_URL}/pro_titles/${id}`, updatedProTitle);
  return response.data;
};

export const deleteProTitle = async (id) => {
  const response = await axios.delete(`${API_URL}/pro_titles/${id}`);
  return response.data;
};