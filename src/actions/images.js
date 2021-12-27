import Swal from 'sweetalert2';

import { fetchForImage } from '../helpers/fetch';
import { types } from '../types/types';

export const removeImageProductActive = () => ({
    type: types.productRemoveActiveImage
});

export const removeImageAdministrator = () => ({
    type: types.administratorsRemoveImageActive
});

const addImage = ( image ) => ({
    type: types.imageAdd,
    payload: image
});

export const removeImage = () => ({
    type: types.imageRemove
});

export const uploadImage = ( img ) => {
    return async ( dispatch ) => {

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const resp = await fetchForImage( '/images/upload', img, 'file' );
        const body = await resp.json();

        if( body.ok ){
            dispatch(addImage( body.url_security ))
        }

        Swal.close();
    }
}

const startSetlistImages = ( images ) => ({
    type: types.imagesSetList,
    payload: images
});

export const removeReducerListImages = () => ({
    type: types.imagesRemoveList
});

export const uploadListImages = ( list_images ) => {
    return async ( dispatch ) => {

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const resp = await fetchForImage( '/upload/multiple/files', list_images, 'files' );
        const body = await resp.json();

        if( body.ok ){
            Swal.fire(
                'Aggregate!',
                `${ list_images.length } images added`,
                'success'
            )
            dispatch( startSetlistImages( body.url_security ) );
        } else {
            Swal.fire(
                'Error',
                'Try again later',
                'error'
            )
        }
    }
}
