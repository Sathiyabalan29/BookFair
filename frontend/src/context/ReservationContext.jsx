import { createContext, useState, useContext } from 'react';

const ReservationContext = createContext();

export const useReservation = () => useContext(ReservationContext);

export const ReservationProvider = ({ children }) => {
    // Initialize from localStorage if available
    const [userId, setUserId] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.id : null;
    });
    const [reservationId, setReservationId] = useState(null);
    const [amountToPay, setAmountToPay] = useState(0);

    const value = {
        userId,
        setUserId,
        reservationId,
        setReservationId,
        amountToPay,
        setAmountToPay
    };

    return (
        <ReservationContext.Provider value={value}>
            {children}
        </ReservationContext.Provider>
    );
};
