import Swal from 'sweetalert2';

import { fetchWithToken, fetchWithTokenAndData } from '../helpers/fetch';
import { types } from '../types/types';


const setAllProducts = ( products ) => ({
    type: types.productsAll,
    payload: products
});

const setProductsID = ( products ) => ({
    type: types.productsForId,
    payload: products
});

const deleteProductsID = ( id ) => ({
    type: types.deleteProducts,
    payload: id
});

export const setActiveProduct = ( product ) => ({
    type: types.productActive,
    payload: product
});

export const quitActiveProduct = () => ({
    type: types.productRemoveActive
});

const updateProduct = ( id, data ) => ({
    type: types.productUpdate,
    payload: { id, data }
});

export const setIdProductActive = ( id ) => ({
    type: types.productIdActive,
    payload: id
});

export const removeIdProductActive = () => ({
    type: types.removeIdActive
});

const startUpdateOfferReducer = ( id_product, data, price ) => ({
    type: types.updateProductOfferReducer,
    payload: {
        id_product,
        data,
        price
    }
})

export const returnAllProducts = () => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( '/product/get_products', 'GET' );
        const data = await resp.json();

        if( data.ok ){
            const { content } = data;
            dispatch( setAllProducts( content ) )           
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            });
        }
    }
}

export const returnProductsForID = ( id ) => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( `/product/get_products_id/${id}`, 'GET' );
        const data = await resp.json();

        if( data.ok ){
            const { content } = data;
            dispatch( setProductsID( content ) );
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            });
        }
    }
}

export const deleteProductId = ( id ) => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( `/product/delete/${id}`, 'DELETE' );
        const data = await resp.json();

        if( data.ok ){
            dispatch( deleteProductsID(id) );  
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            });
        }
    }
}

export const addNewProduct = ( values ) => {
    return async ( dispatch, getState ) => {
        const id_administrator = getState().auth.id;

        const {
            name,
            descriptionList: description, 
            price, 
            coloursList: colours_available,
            handleFree: free_shipping,
            url_image_prinsipal,
            images: url_images
        } = values;
        
        const data_object = {
            id_administrator,
            name, 
            description, 
            price, 
            colours_available, 
            free_shipping, 
            url_image_prinsipal, 
            url_images
        }
        const resp = await fetchWithTokenAndData( '/product/register', 'POST', data_object );
        const body = await resp.json();

        if( body.ok ){
            Swal.fire(
                'Aggregate!',
                'You can modify it later',
                'success'
            );
        } else {
            Swal.fire(
                'Aggregate!',
                body.msg,
                'success'
            );
        }
    }
}

export const startUpdateProduct = (id, data) => {
    return async ( dispatch ) => {

        const {
            name,
            descriptionList: description, 
            price, 
            coloursList: colours_available,
            handleFree: free_shipping,
            url_image_prinsipal
        } = data;

        const data_object = {
            name, 
            description, 
            price, 
            colours_available, 
            free_shipping, 
            url_image_prinsipal
        }

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const resp = await fetchWithTokenAndData( `/product/update/${id}`, 'PUT', data_object );
        const respjson = await resp.json();

        if( respjson.ok ){
            
            data_object.id = id;
            dispatch( updateProduct( id, data_object ) );
            
            Swal.close();
            Swal.fire(
                'Modified!',
                'It has been modified',
                'success'
            ) 
        } else {
            Swal.fire(
                'Error',
                respjson.msg,
                'error'
            )
        }
        

    }
}

export const startUpdateSale = ( id, data ) => {
    return async ( dispatch ) => {
        const resp = await fetchWithTokenAndData( `/product/update/sale/${id}`, 'PUT', data );
        const data_json = await resp.json();

        if( data_json.ok ){
            dispatch( startUpdateOfferReducer( id, data, data_json.content.offer_price ) );
            Swal.fire(
                'Aggregate!',
                data_json.msg,
                'success'
            )
        } else {
            Swal.fire(
                'Error',
                'Try again later',
                'error'
            )
        }
    }
}

export const startAddProductSlider = ( id ) => {
    return async () => {

        const resp = await fetchWithToken( `/product/add/slider/${id}`, 'PUT' );
        const data = await resp.json();

        if( !data.ok ){
            Swal.fire(
                'Error',
                'Try again later',
                'error'
            )
        }
    }
}