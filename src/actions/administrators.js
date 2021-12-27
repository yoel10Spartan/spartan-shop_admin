import Swal from "sweetalert2";
import { fetchWithToken, fetchWithTokenAndData } from "../helpers/fetch";
import { types } from "../types/types";

const setAllAdministrators = ( administrators ) => ({
    type: types.administratorsGet,
    payload: administrators
});

export const setAdministratorActive = ( administrator ) => ({
    type: types.administratorsSetActive,
    payload: administrator
});

export const removeAdministratorActive = () => ({
    type: types.administratorsRemoveActive
});

export const updateAdministratorReducer = ( id, data ) => ({
    type: types.administratorUpdate,
    payload: {
        id,
        ...data 
    }
});

const deleteAdministratorReducer = ( id ) => ({
    type: types.administratorDelete,
    payload: id
});

export const returnAllAdministrators = () => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( '/administrators', 'GET' );
        const data = await resp.json();

        if( data.ok ){
            dispatch( setAllAdministrators( data.content ) );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            });
        }
    }
}

export const addNewAdministrator = ( object_data ) => {
    return async ( dispatch ) => {
        const resp = await fetchWithTokenAndData( '/administrator/register', 'POST', object_data );
        const data = await resp.json();

        if( data.ok ){
            Swal.fire(
                'Aggregate!',
                data.msg,
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            });
        }
    }
}

export const updateAdministrators = ( object_data, id ) => {
    return async ( dispatch ) => {
        const resp = await fetchWithTokenAndData( `/administrator/update/${id}`, 'PUT', object_data );
        const data = await resp.json();

        if( data.ok ){
            Swal.fire(
                'Aggregate!',
                data.msg,
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            });
        }
    }
}

export const deleteAministrator = ( id ) => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( `/administrator/delete/${id}`, 'DELETE' );
        const data = await resp.json();

        if( data.ok ){
            dispatch( deleteAdministratorReducer( id ) );
            Swal.fire(
                'Removed!',
                data.msg,
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            });
        }
    }
}

export const activeCountAdministrator = ( id ) => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( `/administrator/active/${id}`, 'PUT' );
        const data = await resp.json();

        if( !data.ok ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            });
        }
    }
}