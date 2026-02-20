import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import { useReservation } from '../../context/ReservationContext';

const DebitCardPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = useReservation();
    const locationState = location.state || {};
    const bookingId = locationState.bookingId;
    const [amount, setAmount] = useState(Number(locationState.amount) || 0);

    const [cardData, setCardData] = useState({
        name: '',
        number: '',
        expiry: '',
        pin: ''
    });
    const [saveCard, setSaveCard] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({ name: '', number: '', expiry: '', pin: '' });

    // Redirect if invalid booking or amount
    useEffect(() => {
        if (!bookingId || amount <= 0) {
            alert("Invalid Reservation or Amount. Please try booking again.");
            navigate('/venue-map');
        }
    }, [bookingId, amount, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Auto-format card number
        if (name === 'number') {
            const digits = value.replace(/\D/g, '');
            formattedValue = digits.match(/.{1,4}/g)?.join(' ') || '';
        }

        // Auto-format expiry MM/YY
        if (name === 'expiry') {
            formattedValue = value.replace(/[^\d]/g, '');
            if (formattedValue.length > 2) {
                formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
            }
        }

        setCardData(prev => ({ ...prev, [name]: formattedValue }));

        // --- Real-time validation ---
        let errorMsg = '';
        switch(name) {
            case 'name':
                if (formattedValue && !/^[A-Za-z\s]{2,}$/.test(formattedValue)) {
                    errorMsg = 'Letters & spaces only, min 2 chars.';
                }
                break;
            case 'number':
                if (formattedValue && !/^\d{0,16}$/.test(formattedValue.replace(/\s/g, ''))) {
                    errorMsg = 'Card must be 16 digits.';
                }
                break;
            case 'expiry':
                if (formattedValue && !/^(0[1-9]|1[0-2])\/\d{0,2}$/.test(formattedValue)) {
                    errorMsg = 'MM/YY format';
                }
                break;
            case 'pin':
                if (formattedValue && !/^\d{0,4}$/.test(formattedValue)) {
                    errorMsg = 'PIN must be 4 digits';
                }
                break;
            default: break;
        }
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, number, expiry, pin } = cardData;
        const newErrors = { name: '', number: '', expiry: '', pin: '' };
        let hasError = false;

        // Final validation
        if (!/^[A-Za-z\s]{2,}$/.test(name)) { newErrors.name = "Enter valid cardholder name."; hasError = true; }
        const sanitizedNumber = number.replace(/\s/g,'');
        if (!/^\d{16}$/.test(sanitizedNumber)) { newErrors.number = "Enter 16-digit card number."; hasError = true; }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) { newErrors.expiry = "Expiry must be MM/YY."; hasError = true; }
        else {
            const [m,y] = expiry.split('/').map(Number);
            const expDate = new Date(2000+y, m-1, 1);
            const now = new Date();
            if (expDate < new Date(now.getFullYear(), now.getMonth(), 1)) { newErrors.expiry = "Card expired."; hasError = true; }
        }
        if (!/^\d{4}$/.test(pin)) { newErrors.pin = "PIN must be 4 digits."; hasError = true; }

        setErrors(newErrors);
        if (hasError) return;

        // Submit payment
        setIsProcessing(true);
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const finalUserId = userId || (storedUser ? storedUser.id : null);

            if (!bookingId || !finalUserId) { 
                alert("Invalid booking/user"); 
                navigate('/venue-map'); 
                return; 
            }

            await paymentService.createPayment({
                userId: finalUserId,
                reservationId: Number(bookingId),
                paymentMethod: 'DEBIT_CARD',
                amount: Number(amount)
            });
            alert('Payment Successful!');
            navigate('/select-genres');
        } catch (error) {
            alert('Payment failed: ' + (error.response?.data?.message || error.message || "Unknown error"));
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">

                {/* Header */}
                <div className="mb-6">
                    <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Cancel
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">Debit Card Payment</h2>
                    <p className="text-sm text-gray-500 mt-1">Safe & Secure bank transaction.</p>
                </div>

                {/* Amount Display */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center border border-blue-100">
                    <span className="text-blue-800 font-medium">Total to Pay</span>
                    <span className="text-xl font-bold text-blue-900">Rs. {amount.toLocaleString()}</span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Cardholder Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Jane Doe"
                            value={cardData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Card Number */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Debit Card Number</label>
                        <input
                            type="text"
                            name="number"
                            placeholder="0000 0000 0000 0000"
                            maxLength="19"
                            value={cardData.number}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm pl-10 focus:ring-blue-500 focus:border-blue-500 ${errors.number ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                    </div>

                    {/* Expiry & PIN */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                maxLength="5"
                                value={cardData.expiry}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.expiry ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">PIN</label>
                            <input
                                type="password"
                                name="pin"
                                placeholder="****"
                                maxLength="4"
                                value={cardData.pin}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.pin ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
                        </div>
                    </div>

                    {/* Save Card */}
                    <div className="flex items-center">
                        <input
                            id="save-card"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                        />
                        <label htmlFor="save-card" className="ml-2 block text-sm text-gray-900">
                            Save debit card securely
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isProcessing || amount <= 0}
                        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isProcessing ? 'Processing...' : `Pay Rs. ${amount.toLocaleString()}`}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default DebitCardPage;