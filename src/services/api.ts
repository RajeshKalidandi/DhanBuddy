import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('/token/', { username, password });
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  },

  register: async (userData: any) => {
    return api.post('/accounts/register/', userData);
  },

  resetPassword: async (email: string) => {
    return api.post('/accounts/users/reset_password/', { email });
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    return api.post('/accounts/users/change_password/', {
      old_password: oldPassword,
      new_password: newPassword,
    });
  },
};

// Transaction services
export const transactionService = {
  getTransactions: async () => {
    return api.get('/transactions/transactions/');
  },

  createTransaction: async (transactionData: any) => {
    return api.post('/transactions/transactions/', transactionData);
  },

  updateTransaction: async (id: number, transactionData: any) => {
    return api.put(`/transactions/transactions/${id}/`, transactionData);
  },

  deleteTransaction: async (id: number) => {
    return api.delete(`/transactions/transactions/${id}/`);
  },
};

// Goals services
export const goalService = {
  getGoals: async () => {
    return api.get('/goals/savings/');
  },

  createGoal: async (goalData: any) => {
    return api.post('/goals/savings/', goalData);
  },

  updateGoal: async (id: number, goalData: any) => {
    return api.put(`/goals/savings/${id}/`, goalData);
  },

  deleteGoal: async (id: number) => {
    return api.delete(`/goals/savings/${id}/`);
  },
};

export default api; 