import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta as any).env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const farmApi = {
  getFarmProfile: async (farmerId: string) => {
    const { data } = await api.get(`/api/farms/farmer/${farmerId}`);
    return data;
  },
  
  createFarmProfile: async (profileData: any) => {
    const { data } = await api.post('/api/farms', profileData);
    return data;
  }
}; 