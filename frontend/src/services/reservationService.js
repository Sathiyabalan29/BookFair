import api from './api';

const reservationService = {
    createReservation: async (reservationData) => {
        const response = await api.post('/api/reservations/reserve', reservationData);
        return response.data;
    },

    getUserReservations: async (userId) => {
        try {
            const response = await api.get(`/api/reservations/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user reservations:", error);
            throw error;
        }
    },

    getReservationById: async (id) => {
        const response = await api.get(`/api/reservations/${id}`);
        return response.data;
    },

    cancelReservation: async (id) => {
        const response = await api.post(`/api/reservations/cancel/${id}`);
        return response.data;
    },

    cofirmReservation : async (id) => {
        const response = await api.post(`/api/reservations/confirm/${id}`);
        return response.data;
    }
};

export default reservationService;
