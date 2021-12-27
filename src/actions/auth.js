import Swal from "sweetalert2";

import { fetchLogin, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types";

const login = ( id, name, email ) => ({
    type: types.authStartLogin,
    payload: {
        email, name, id
    }
})

export const startExit = () => ({
    type: types.authStartExit
})

export const startLogin = ( data_login ) => {
    return async ( dispatch ) => {
        const resp = await fetchLogin( '/administrator/login', data_login, 'POST' );
        const data = await resp.json();
        
        if( data.ok ){
            const { id, email, name, token } = data.content;
            localStorage.setItem( 'token', token );
            dispatch( login( id, name, email ) );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            });
        }

    }
}

export const chekingToken = () => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( '/administrator/renew', 'POST' );
        const data = await resp.json();

        if( data.ok ){
            const { id, email, name } = data.content.data;
            dispatch( login( id, name, email ) );
            localStorage.setItem( 'token', data.content.token );
        } else {
            dispatch( startLogout() );
        }
    }
}

export const startLogout = () => {
    return ( dispatch ) => {
        dispatch( startExit() );
        localStorage.clear();
    }
}