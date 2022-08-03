import { GET_PRODUCTS, START_LOADING, END_LOADING } from "../actionTypes.js";
import * as api from "../../services/api.js";

export const getProducts = (name) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {
            data: { data },
        } = await api.getProducts(name);

        dispatch({ type: GET_PRODUCTS, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};
