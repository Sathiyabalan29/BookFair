import api from './api';

const getAllUsers = async () => {
    const response = await api.get('/users/all');
    return response.data;
};

const getUserById = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

const updateUserGenres = async (userId, genreIds) => {
    const response = await api.put(`/api/genres/add`, genreIds);
    return response.data;
};

export default {
    getAllUsers,
    getUserById,
    updateUserGenres
};
