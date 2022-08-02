import { combineReducers } from "redux";

import products from "./products.js";
import invoices from "./invoices.js";

export const reducers = combineReducers({ products, invoices });
