import { GET_INVOICES, CREATE_INVOICE, GET_INVOICES_GRAPH, START_LOADING, END_LOADING } from "../actionTypes";
import * as api from "../../services/api.js";

export const getInvoices = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getInvoices();

        dispatch({ type: GET_INVOICES, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createInvoice = (invoice) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createInvoice(invoice);

        dispatch({ type: CREATE_INVOICE, payload: data });
        dispatch(getInvoicesGraph());
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getInvoicesGraph = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getInvoicesGraph();

        dispatch({ type: GET_INVOICES_GRAPH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};
