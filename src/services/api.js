import axios from "axios";


// const API_URL = "http://localhost:5000/api/trading"; 
// const API_URL = "https://algo-testing-trading-s.onrender.com/api/trading";
const API_URL = "https://algo-testing-trading-production.up.railway.app/api/trading";


export const generateToken = async (data) => {
  await axios.post(`${API_URL}/token`, data);
};

export const getTokenDetails = async () => {
  const response = await axios.get(`${API_URL}/getTokenDetails`);
  return response;
};

export const submitInstrumentKeyCE = async (data) => {
  const response = await axios.post(`${API_URL}/instrumentce`, data);
  console.log(response);
};

export const submitInstrumentKeyPE = async (data) => {
  const response = await axios.post(`${API_URL}/instrumentpe`, data);
  console.log(response);
};

export const startTrading = async () => {
  const response = await axios.post(`${API_URL}/starttrading`);
  console.log(response);
};

export const getUserData = async (data) => {
  const response = await axios.post(`${API_URL}/userdata`, data);
  return response
};

export const stopTrading = async () => {
  const response = await axios.post(`${API_URL}/stop-websocket`);
  return response
};

export const getInstruments  = async ()=>{
  const response = await axios.get(`${API_URL}/instruments`);
  return response
}

export const getNifty50Value  = async ()=>{
  const response = await axios.get(`${API_URL}/nifty50data`);
  return response
}

export const getBnkNiftyValue  = async ()=>{
  const response = await axios.get(`${API_URL}/bankniftydata`);
  return response
}

export const resetUserDetails  = async (name)=>{
  const response = await axios.post(`${API_URL}/resetUserDetails`, {name});
  return response
}

export const addUnsetteldFunds  = async (name)=>{
  const response = await axios.post(`${API_URL}/addUnsetteldFunds`);
  return response
}

export const getUserStatus = async (username) => {
  const response = await axios.post(`${API_URL}/getuserstate`, {username});
  return response
};

export const toggleUserTrading = async (userName, status) => {
  if (!userName) throw new Error("Username is required");

  const response = await axios.post(`${API_URL}/toggleTrading`, { userName, status });
  return response.data;
};