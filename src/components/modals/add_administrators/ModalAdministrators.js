import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addNewAdministrator, returnAllAdministrators, removeAdministratorActive, updateAdministrators, updateAdministratorReducer } from '../../../actions/administrators';
import { removeImage } from '../../../actions/images';

import { customStyles } from '../customStyles';
import { AddAdministrators } from '../small_forms/AddAdministrators';

const initialForm = {
    name: '',
    lastname: '',
    email: '',
    password: ''
};

export const ModalAdministrators = ({ openModal, setOpenModal }) => {

    const dispatch = useDispatch();
    const [ handleActive, setHandleActive ] = useState( false );
    const [ values, setFormValues ] = useState( initialForm );
    const [id, setId] = useState( 0 );

    const { image } = useSelector(state => state.images);
    const { administrator_active } = useSelector(state => state.administrators);

    useEffect(() => {
        if( !!administrator_active ){
            const {
                id, name, lastname, email, password
            } = administrator_active;

            setFormValues({
                name, lastname, email, password
            });
            setId( id )
        } else {
            setFormValues( initialForm );
        }
    }, [ dispatch, administrator_active ])

    const { name, lastname, email, password } = values;

    const url_photo = !!administrator_active 
                        ? ( !!administrator_active['url_photo'] ) 
                            ?  administrator_active['url_photo']
                            : image
                        : image

    // Changing values ​​in the setForm
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    const handleCloseModal = () => {
        setOpenModal( false );

        // We remove the active manager from 'Reducer Administrator'
        dispatch( removeAdministratorActive() );

        // Delete the image from 'Reducer Images'
        dispatch( removeImage() );
    }
    
    const re_name = /^(([a-zA-Z0-9-_./])+\s*){1,3}$/;
    
    const handleSendInformation = () => {
        if(
            re_name.test( name.trim() ) &&
            re_name.test( lastname.trim() ) && 
            email !== '' &&
            password.length >= 7 &&
            url_photo !== ''
        ) {
            const data_object = {
                name: name.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                password: password.trim(),
                active: handleActive,
                url_photo
            };
            handleCloseModal()
            dispatch( addNewAdministrator( data_object ) );
            dispatch( returnAllAdministrators() );
            setFormValues({
                name: '',
                lastname: '',
                email: '',
                password: ''
            });
            setHandleActive( false );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The information you are submitting is invalid'
            });
        }
    }

    const handleUpdateInformation = () => {
        if(
            re_name.test( name.trim() ) &&
            re_name.test( lastname.trim() ) && 
            email !== '' &&
            password.length >= 7 &&
            url_photo !== ''
        ) {
            const data_object = {
                name: name.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                password: password.trim(),
                url_photo
            };
            dispatch( updateAdministrators( data_object, id ) );
            dispatch( removeAdministratorActive() );
            handleCloseModal();
            dispatch( updateAdministratorReducer( id, data_object ) );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The information you are submitting is invalid'
            });
        } 
    }

    return (
        <div>
            <Modal
                isOpen={ openModal }
                onRequestClose={ handleCloseModal }
                style={ customStyles }
                closeTimeoutMS={ 200 }
                className="modal"
                overlayClassName="modal-fondo"
            >
                <p className='title_modal'>
                {
                    !!administrator_active 
                        ? 'Update an administrator'
                        : 'Add new administrator'
                }
                </p>
                <AddAdministrators
                    handlers={ [ handleActive, handleInputChange, handleSendInformation, handleUpdateInformation ] }
                    setters={ [ setHandleActive ] }
                    activators={ [ administrator_active ] }
                    values={ values }
                />
            </Modal>     
        </div>
    )
}