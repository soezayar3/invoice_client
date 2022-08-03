import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const API = axios.create({ baseURL: baseURL });

export const getProducts = (name) => API.get(`/products?search=${name}`);

export const getInvoices = () => API.get(`/invoices`);
export const createInvoice = (newInvoice) => API.post("/invoices", newInvoice);
export const getInvoicesGraph = () => API.get(`/invoices/graph`);
