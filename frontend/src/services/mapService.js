import api from './api';

export const fetchHalls = async () => {
  const response = await api.get("/api/halls/map");
  return response.data;
};

export const fetchStalls = async () => {
  const response = await api.get("/api/stalls/map");
  return response.data;
};

// HOLD API
export const holdStalls = async (stallIds) => {
  const response = await api.post("/api/stalls/hold", {
    stallIds: stallIds,
  });
  return response.data;
};

// User reservation count
export const getUserReservationCount = async () => {
  const response = await api.get("/api/stalls/user-reservation-count");
  return response.data;
};
