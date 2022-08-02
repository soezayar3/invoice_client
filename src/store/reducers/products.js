import { GET_PRODUCTS, START_LOADING, END_LOADING } from "../actionTypes";

export default (state = { isLoading: true, products: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.data,
            };
        default:
            return state;
    }
};
