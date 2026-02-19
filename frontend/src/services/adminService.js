import api from './api';

const getDashboardStats = () => {
    return api.get('/admin/dashboard').then(response => response.data);
};

const getAllUsers = () => {
    return api.get('/admin/users').then(response => response.data);
};

const createUser = (userData) => {
    return api.post('/admin/users', userData).then(response => response.data);
};

const deleteUser = (userId) => {
    return api.delete(`/admin/users/${userId}`).then(response => response.data);
};

const generateUserQrPass = (userId) => {
    return api.post(`/admin/users/${userId}/pass/generate`).then(response => response.data);
};

const sendUserQrPassEmail = (userId) => {
    return api.post(`/admin/users/${userId}/pass/email`).then(response => response.data);
};

const getAllStalls = () => {
    return api.get('/admin/stalls').then(response => response.data);
};

const getAvailableStalls = () => {
    return api.get('/admin/stalls/available').then(response => response.data);
};

const getReservedStalls = () => {
    return api.get('/admin/stalls/reserved').then(response => response.data);
};

const getStallMap = () => {
    return api.get('/admin/stalls/map').then(response => response.data);
};

const getAllReservations = () => {
    return api.get('/admin/reservations').then(response => response.data);
};

const getGenreReports = () => {
    return api.get('/admin/genres/reports').then(response => response.data);
};

const addGenre = (genreName) => {
    return api.post('/admin/genres/add', { genreName }).then(response => response.data);
};

export default {
    getDashboardStats,
    getAllUsers,
    createUser,
    deleteUser,
    generateUserQrPass,
    sendUserQrPassEmail,
    getAllStalls,
    getAvailableStalls,
    getReservedStalls,
    getStallMap,
    getAllReservations,
    getGenreReports,
    addGenre
};
