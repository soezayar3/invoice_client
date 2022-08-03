import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3030" });

export const getProducts = (name) => API.get(`/products?search=${name}`);

export const getInvoices = () => API.get(`/invoices`);
export const createInvoice = (newInvoice) => API.post("/invoices", newInvoice);
export const getInvoicesGraph = () => API.get(`/invoices/graph`);
