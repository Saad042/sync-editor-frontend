import axios from 'axios';

const API_ORIGIN = process.env.VUE_APP_API_ORIGIN;
const API_URL = API_ORIGIN + 'api/docs/';

const WS_URL = process.env.VUE_APP_WS_URL;

export const getDocs = () => {
  return axios.get(API_URL);
};

export const createDoc = (data) => {
  console.log(data);
  return axios.post(API_URL, data);
};

export const getDoc = (id) => {
  return axios.get(API_URL + id);
};

export const updateDoc = (id, data) => {
  return axios.put(API_URL + id, data);
};

export const createWebSocketConnection = () => {
  return new WebSocket(WS_URL);
};
