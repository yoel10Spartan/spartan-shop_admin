import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ItemAdministrators } from './ItemAdministrators';
import { ModalAdministrators } from '../../modals/add_administrators/ModalAdministrators';

import { Button } from '@material-ui/core';
import './ContainerCardsAdministrators.css';

export const ContainerCardsAdministrators = () => {
    
    const [openModal, setOpenModal] = useState( false );
    const { administrators, administrator_active } = useSelector(state => state.administrators);
    const { id: idAdministrator } = useSelector(state => state.auth);

    useEffect(() => {
        if( !!administrator_active ){
            setOpenModal( true )
        }
    }, [ administrator_active ])
    
    const handleOpenModal = () => {
        setOpenModal( !openModal );
    }

    return (
        <div>
            <Button 
                variant="outlined"
                color="primary" 
                style={{ margin: '-15px 0 20px 10px' }}
                onClick={ handleOpenModal }
            >
                add new
            </Button>
            <div className='cards_administrators_grid'>
                {
                    administrators.map( admin => (
                        admin.id !== idAdministrator 
                            ? <ItemAdministrators key={ admin.id } { ...admin } />
                            : ''
                    ))
                }
            </div>
            <ModalAdministrators
                openModal={ openModal }
                setOpenModal={ setOpenModal }
            />
        </div>
    )
}