import axios from 'axios';

const API_URL = 'http://localhost:8080/api/expenses';

export const getExpenses = () => axios.get(API_URL);
export const createExpense = (expense) => axios.post(API_URL, expense);
export const updateExpense = (id, expense) => axios.put(`${API_URL}/${id}`, expense);
export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`);
export const getCategories = () => axios.get(`${API_URL}/categories`);
export const getExpenseSummary = () => axios.get(`${API_URL}/summary`);
