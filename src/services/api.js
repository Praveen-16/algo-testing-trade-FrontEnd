import axios from "axios";


// const API_URL = "http://localhost:5000/api/trading";
const API_URL = "https://algo-testing-2.onrender.com/api/trading";


export const generateToken = async (data) => {
  const token = await axios.post(`${API_URL}/token`, data);
  console.log("TOKEN: ", token);
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
  console.log( "check")
  const response = await axios.get(`${API_URL}/nifty50data`);
  console.log(response, "check")
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
  // console.log(response)
  return response
}