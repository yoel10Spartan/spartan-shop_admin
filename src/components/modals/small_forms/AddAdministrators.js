import React from 'react';

import { DragDrop } from '../../ui/DragDrop';

import { Button } from '@material-ui/core';
import { removeImageAdministrator } from '../../../actions/images';

export const AddAdministrators = ({ handlers, setters, activators, values }) => {

    const [ 
        handleActive, 
        handleInputChange, 
        handleSendInformation, 
        handleUpdateInformation 
    ] = handlers;
    const [ setHandleActive ] = setters;
    const [ administrator_active ] = activators;
    const { name, lastname, email, password } = values;

    return (
        <form className='form__modal'>
            <label>Name the administrators</label>
            <input 
                type='text' 
                name='name'
                className='input_modal'
                autoComplete='off'
                value={ name }
                onChange={ handleInputChange }
            />
            <label>Lastname</label>
            <input 
                type='text' 
                name='lastname'
                className='input_modal'
                autoComplete='off'
                value={ lastname }
                onChange={ handleInputChange }
            />
            <label>Email</label>
            <input 
                type='email' 
                name='email'
                className='input_modal'
                autoComplete='off'
                value={ email }
                onChange={ handleInputChange }
            />
            <label>Password</label>
            <input 
                type='password' 
                name='password'
                className='input_modal'
                autoComplete='off'
                value={ password }
                onChange={ handleInputChange }
            />

            {
                !!administrator_active ? '' : (<div>
                    <label>Is the user active?</label>
                    <input 
                        type='checkbox' 
                        name='active'
                        className='checkbox input_modal'
                        checked={ handleActive }
                        onChange={ () => setHandleActive( !handleActive ) }    
                    />
                </div>)
            }
            <DragDrop 
                element_active={ administrator_active }
                remove_actvive_element={ removeImageAdministrator }
                element_to_extract='url_photo'
            />
            <Button 
                variant="outlined"
                color="primary"
                onClick={ !!administrator_active 
                            ? handleUpdateInformation 
                            : handleSendInformation 
                }
                style={{ margin: '25px 0 0 0' }}
            >
                {
                    !!administrator_active 
                        ? 'To Updated'
                        : 'Register'
                }
            </Button>
        </form>
    )
}
