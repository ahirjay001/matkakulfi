import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const getFlavours = async () => {
  const res = await axios.get(`${API}/flavours`);
  return res.data.flavours;
};

export const getLocations = async (q = "", region = "") => {
  const res = await axios.get(`${API}/locations`, { params: { q: q || undefined, region: region || undefined } });
  return res.data;
};

export const submitFranchiseEnquiry = async (data) => {
  const res = await axios.post(`${API}/franchise-enquiry`, data);
  return res.data;
};

export const submitContact = async (data) => {
  const res = await axios.post(`${API}/contact`, data);
  return res.data;
};
