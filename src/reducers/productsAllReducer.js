import { types } from "../types/types";

const initState = {
    products_all: [],
    products_for_id: [],
    product_active: null,
    id_active: null
}

export const productsAllReducer = ( state = initState, action ) => {
    switch ( action.type ) {

        case types.productsAll:
            return {
                ...state,
                products_all: [ ...action.payload ]
            }
        
        case types.productsForId:
            return {
                ...state,
                products_for_id: [ ...action.payload ]
            }

        case types.updateProductOfferReducer:
            return {
                ...state,
                products_for_id: state.products_for_id.map( product => {
                    if(product.id === action.payload.id_product){
                        product.on_sale = action.payload.data.on_sale
                        product.porcentage = action.payload.data.porcentage
                        product.offer_price = action.payload.price
                        return product
                    } else { return product }
                })
            }

        case types.deleteProducts:
            return {
                ...state,
                products_for_id: state.products_for_id.filter( product => product.id !== action.payload )
            }

        case types.productUpdate:
            return {
                ...state,
                products_for_id: state.products_for_id.map(
                    product => (product.id === action.payload.id) 
                                    ? action.payload.data 
                                    : product 
                )
            }

        case types.productActive:
            return {
                ...state,
                product_active: action.payload
            }

        case types.productRemoveActive:
            return {
                ...state,
                product_active: null
            }

        case types.productRemoveActiveImage:
            return {
                ...state,
                product_active: {
                    ...state.product_active,
                    url_image_prinsipal: null
                }
            }

        case types.productIdActive: 
            return {
                ...state,
                id_active: action.payload
            }
        
        case types.removeIdActive:
            return {
                ...state,
                id_active: null
            }

        default:
            return state;
    }

}