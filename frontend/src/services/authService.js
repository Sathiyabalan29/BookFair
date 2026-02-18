import api from './api';
import { jwtDecode } from "jwt-decode"; 
const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); 
            return response.data;
        } else {
            throw { message: response.data.message || 'Login failed' };
        }
    } catch (error) {
        if (error.message && !error.response) throw error; 
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; 
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const getToken = () => {
    return localStorage.getItem('token');
};

const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    } catch (e) {
        return false;
    }
};

const getRole = () => {
    const token = getToken();
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
      
        return decoded.role || null;
    } catch (e) {
        return null;
    }
};


export default {
    register,
    login,
    logout,
    getCurrentUser,
    getToken,
    isAuthenticated,
    getRole
};

export { getRole };
