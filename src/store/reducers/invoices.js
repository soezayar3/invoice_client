import { GET_INVOICES, CREATE_INVOICE, GET_INVOICES_GRAPH, START_LOADING, END_LOADING } from "../actionTypes";

export default (state = { isLoading: true, invoices: [], invoices_graphs: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case GET_INVOICES:
            return {
                ...state,
                invoices: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case CREATE_INVOICE:
            return { ...state };
        case GET_INVOICES_GRAPH:
            return {
                ...state,
                invoices_graphs: action.payload.data,
            };
        default:
            return state;
    }
};
