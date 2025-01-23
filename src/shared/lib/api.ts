
import { useAuthStore } from '@/store/auth/auth.store';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().user?.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    }
)

export {
    api
}