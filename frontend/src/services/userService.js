import api from './api';


const getUserById = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

const getAllGenres = async () => {
    const response = await api.get('/genres/all'); // matches backend GET /genres/all
    return response.data;
};


const getGenresByUserId = async (userId) => {
    const response = await api.get(`/genres/user/${userId}`); // matches GET /genres/user/{userId}
    return response.data;
};


const addGenre = async (genreDTO) => {
    const response = await api.post('/genres/add', genreDTO); // POST, path matches backend
    return response.data;
};


const updateUserGenres = async (userId, genreIds) => {
    const response = await api.put(`/genres/user/${userId}`, genreIds);
    return response.data;
};

export default {
    getAllGenres,
    getGenresByUserId,
    addGenre,
    updateUserGenres,
    getUserById
};