import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import './ItemAdministrators.css';
import { activeCountAdministrator, deleteAministrator, setAdministratorActive } from '../../../actions/administrators';

export const ItemAdministrators = ({ 
        id, 
        name, 
        lastname, 
        email, 
        password, 
        active: activeUser, 
        url_photo 
    }) => {

    const dispatch = useDispatch();
    const [active, setActive] = useState( activeUser );

    const handleActivateDesactivate = ( event ) => {
        event.stopPropagation();
        dispatch( activeCountAdministrator( id ) );
        setActive( !active );
    }

    const emailCut = email.split('@')[0] + '@...';

    const handleSetActive = () => {
        const administrator = {
            id, name, lastname, email, password: '', url_photo
        }
        dispatch( setAdministratorActive( administrator ) );
    }

    const handleDeleteAdministrator = ( event ) => {
        event.stopPropagation();
        dispatch( deleteAministrator( id ) );
    }

    return (
        <div>
            <div 
                className='card_administrators' 
                onClick={ handleSetActive }
            >
                <img className='photo_administrators' alt='yoel' src={ url_photo } />
                <p className='name_administrators'>{ name }</p>
                <p className='lastname_administrators'>{ lastname }</p>
                <p className='email_administrators' title={email} >{ emailCut }</p>
                <p className='password_administrators'>********</p>
                <div 
                    onClick={ handleActivateDesactivate }
                    className="icon_active facebook"
                >
                    <div className="tooltip_active">
                        {  active ? 'Active' : 'Desactive' }
                    </div>
                    <span>
                        <i className={ 
                            active 
                                ? 'bx bxs-lock-open-alt'
                                : 'bx bxs-lock-alt'
                            }
                        ></i>
                    </span>
                </div>
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={ handleDeleteAdministrator }
                >
                    Delete
                </Button>   
            </div>
        </div>
    )
}
