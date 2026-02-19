import api from './api';

const createPayment = async (paymentRequest) => {
    try {
        const response = await api.post('/api/payments', paymentRequest);
        return response.data;
    } catch (error) {
        console.error("Payment failed:", error);
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

const getPaymentsByUserId = async (userId) => {
    try {
        const response = await api.get(`/api/payments/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user payments:", error);
        throw error;
    }
};

const getRefundsByUserId = async (userId) => {
    try {
        const response = await api.get(`/api/refunds/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user refunds:", error);
        throw error;
    }
};

const requestRefund = async (refundRequest) => {
    try {
        const response = await api.post('/api/refunds', refundRequest);
        return response.data;
    } catch (error) {
        console.error("Refund request failed:", error);
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export default {
    createPayment,
    getPaymentsByUserId,
    requestRefund,
};
