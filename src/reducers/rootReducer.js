import { combineReducers } from 'redux';
import { administratorsReducer } from './administratorsReducer';
import { authReducer } from './authReducer';
import { imageReducer } from './imageReducer';
import { productsAllReducer } from './productsAllReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    all_products: productsAllReducer,
    images: imageReducer,
    administrators: administratorsReducer
});
