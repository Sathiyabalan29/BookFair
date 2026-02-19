import api from './api';

const refundService = {
    requestRefund: async (refundData) => {
        const response = await api.post('/api/refunds', refundData);
        return response.data;
    },

    getRefundsByUserId: async (userId) => {
        const response = await api.get(`/api/refunds/user/${userId}`);
        return response.data;
    }
};

export default refundService;
