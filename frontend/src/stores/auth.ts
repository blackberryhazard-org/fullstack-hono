import { defineStore } from 'pinia';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(credentials: any) {
      const response = await api.post('/login', credentials);
      this.token = response.data.data.token;
      this.user = response.data.data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    async register(data: any) {
      await api.post('/register', data);
    },
    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});

export { api };
